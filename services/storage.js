/**
 * FREEGURINHA — services/storage.js
 * Album data backed by Supabase
 * Cache local (Map) + sync em background
 */

import { supabase } from './supabase.js';

const _cache = new Map();
let _userId = null;
let _loaded = false;

export const storage = {
  async init(userId) {
    _userId = userId;
    _cache.clear();
    _loaded = false;
    await this._loadFromDB();
  },

  async _loadFromDB() {
    if (!_userId) return;
    const { data, error } = await supabase
      .from('album')
      .select('sticker_id, qty')
      .eq('user_id', _userId);
    if (error) {
      console.error('loadFromDB:', error.message);
      return;
    }
    _cache.clear();
    data.forEach((r) => _cache.set(r.sticker_id, r.qty));
    _loaded = true;
  },

  get(id) {
    return _cache.get(id) || 0;
  },
  isLoaded() {
    return _loaded;
  },

  getStatus(id) {
    const q = this.get(id);
    return q === 0 ? 'missing' : q === 1 ? 'owned' : 'duplicate';
  },

  getAll() {
    const obj = {};
    _cache.forEach((qty, id) => {
      obj[id] = qty;
    });
    return obj;
  },

  async set(id, qty) {
    const q = Math.max(0, qty);
    _cache.set(id, q);
    if (!_userId) return;
    const { error } = await supabase.rpc('upsert_sticker', {
      p_sticker_id: id,
      p_qty: q,
    });
    if (error) console.error('set sticker:', error.message);
  },

  async increment(id) {
    return this.set(id, this.get(id) + 1);
  },
  async decrement(id) {
    return this.set(id, this.get(id) - 1);
  },

  async import(jsonData) {
    if (!_userId) throw new Error('Nao autenticado');
    const rows = Object.entries(jsonData).map(([sticker_id, qty]) => ({
      user_id: _userId,
      sticker_id,
      qty: Math.max(0, qty),
    }));
    const { error } = await supabase
      .from('album')
      .upsert(rows, { onConflict: 'user_id,sticker_id' });
    if (error) throw new Error(error.message);
    Object.entries(jsonData).forEach(([id, qty]) =>
      _cache.set(id, Math.max(0, qty)),
    );
  },

  export() {
    return JSON.stringify(this.getAll(), null, 2);
  },

  async reset() {
    if (!_userId) return;
    const { error } = await supabase
      .from('album')
      .delete()
      .eq('user_id', _userId);
    if (error) throw new Error(error.message);
    _cache.clear();
  },

  getMissingIds(allStickers) {
    return allStickers.filter((s) => this.get(s.id) === 0).map((s) => s.id);
  },

  getDuplicates(allStickers) {
    return allStickers
      .filter((s) => this.get(s.id) > 1)
      .map((s) => ({
        id: s.id,
        qty: this.get(s.id),
        extras: this.get(s.id) - 1,
      }));
  },

  calcStats(stickers) {
    let owned = 0,
      missing = 0,
      dups = 0;
    stickers.forEach((s) => {
      const q = this.get(s.id);
      if (q === 0) missing++;
      else {
        owned++;
        if (q > 1) dups++;
      }
    });
    const total = stickers.length;
    return {
      total,
      owned,
      missing,
      duplicateItems: dups,
      pct: total ? Math.round((owned / total) * 100) : 0,
    };
  },
};
