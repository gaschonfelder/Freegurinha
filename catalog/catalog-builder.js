/**
 * FREEGURINHA — catalog/catalog-builder.js
 * ─────────────────────────────────────────────────────────────────
 * Gera a lista completa de figurinhas a partir do catalog.config.js
 * NÃO edite este arquivo — edite apenas o catalog.config.js
 * ─────────────────────────────────────────────────────────────────
 */

import {
  ALBUM_CONFIG,
  GROUPS,
  STADIUMS,
  INTRO_STICKERS,
  SPECIAL_STICKERS,
  COUNTRY_THEMES,
  STICKER_TYPES,
} from './catalog.config.js';

let _catalog = null;

export function buildCatalog() {
  if (_catalog) return _catalog;

  const groups = [];
  const byId = {};
  let num = 1;

  const mk = (id, type, name, opts = {}) => {
    const s = { id, number: num++, type, name, ...opts };
    byId[id] = s;
    return s;
  };

  // 1. INTRODUÇÃO
  groups.push({
    id: 'intro',
    label: 'Introdução',
    flag: '🏆',
    type: STICKER_TYPES.INTRO,
    stickers: INTRO_STICKERS.map((c) =>
      mk(c.id, STICKER_TYPES.INTRO, c.name, {
        shiny: c.shiny,
        country: 'INTRO',
        flag: '🏆',
        iconKey: c.iconKey,
      }),
    ),
  });

  // 2. ESTÁDIOS
  groups.push({
    id: 'stadiums',
    label: 'Estádios',
    flag: '🏟️',
    type: STICKER_TYPES.STADIUM,
    stickers: STADIUMS.map((s) =>
      mk(`EST-${s.code}`, STICKER_TYPES.STADIUM, s.name, {
        description: s.host ? `${s.city} · ${s.host}` : s.city,
        country: s.country,
        shiny: false,
        flag: s.flag,
        iconKey: 'estadio',
        capacity: s.capacity,
        host: s.host,
      }),
    ),
  });

  // 3. SELEÇÕES (por grupo A–L)
  for (const grp of GROUPS) {
    for (const team of grp.teams) {
      const base = {
        country: team.code,
        flag: team.flag,
        groupId: grp.id,
        groupLabel: grp.label,
        placeholder: team.placeholder || false,
        placeholderNote: team.placeholderNote || '',
      };
      const items = [];

      // Escudo (brilhante)
      if (ALBUM_CONFIG.hasShield) {
        items.push(
          mk(`${team.code}-SCU`, STICKER_TYPES.SHIELD, 'Escudo', {
            ...base,
            shiny: true,
          }),
        );
      }

      // Foto coletiva
      if (ALBUM_CONFIG.hasTeamPhoto) {
        items.push(
          mk(`${team.code}-COL`, STICKER_TYPES.PHOTO, 'Foto Oficial', {
            ...base,
            shiny: false,
          }),
        );
      }

      // Jogadores individuais
      const craquePositions = new Set(
        (team.craques || []).map((c) => c.position),
      );

      for (let p = 1; p <= ALBUM_CONFIG.playersPerTeam; p++) {
        const playerName = team.players?.[p - 1] || `Jogador ${p}`;
        const isCraque = craquePositions.has(p);
        const craqueData = isCraque
          ? team.craques.find((c) => c.position === p)
          : null;

        if (isCraque && craqueData) {
          // Card CRAQUE — tipo especial com foto
          items.push(
            mk(
              `${team.code}-CRQ-${String(p).padStart(2, '0')}`,
              STICKER_TYPES.CRAQUE,
              craqueData.name,
              {
                ...base,
                shiny: true,
                position: p,
                playerFile: craqueData.playerFile || '',
              },
            ),
          );
        } else {
          // Jogador padrão
          items.push(
            mk(
              `${team.code}-${String(p).padStart(2, '0')}`,
              STICKER_TYPES.PLAYER,
              playerName,
              { ...base, shiny: false, position: p },
            ),
          );
        }
      }

      groups.push({
        id: team.code,
        label: team.name,
        flag: team.flag,
        groupId: grp.id,
        groupLabel: grp.label,
        type: STICKER_TYPES.PLAYER,
        placeholder: team.placeholder || false,
        placeholderNote: team.placeholderNote || '',
        stickers: items,
      });
    }
  }

  // 4. ESPECIAIS + DUPLAS
  groups.push({
    id: 'special',
    label: 'Especiais',
    flag: '✨',
    type: STICKER_TYPES.SPECIAL,
    stickers: SPECIAL_STICKERS.map((c) =>
      mk(
        c.id,
        c.type === 'double' ? STICKER_TYPES.DOUBLE : STICKER_TYPES.SPECIAL,
        c.name,
        {
          shiny: c.shiny,
          country: c.country || 'SPECIAL',
          flag: '✨',
          iconKey: 'especial',
          doublePlayers: c.players || null,
        },
      ),
    ),
  });

  _catalog = { groups, byId, total: num - 1 };
  return _catalog;
}

// Utilitários
export function getTheme(s) {
  const fallback = COUNTRY_THEMES.REP;
  if (['INTRO', 'SPECIAL'].includes(s.country)) {
    return {
      primary: '#c8920a',
      code: '#8a6200',
      bar: '#c8920a',
      bg: '#fdf3db',
    };
  }
  if (s.type === STICKER_TYPES.STADIUM) {
    const k = s.country === 'CAN' ? 'CAN' : s.country === 'MEX' ? 'MEX' : 'USA';
    return COUNTRY_THEMES[k] || fallback;
  }
  return COUNTRY_THEMES[s.country] || fallback;
}

export const TYPE_LABELS = {
  [STICKER_TYPES.PLAYER]: 'Jogador',
  [STICKER_TYPES.PHOTO]: 'Foto',
  [STICKER_TYPES.SHIELD]: 'Escudo',
  [STICKER_TYPES.CRAQUE]: 'Craque',
  [STICKER_TYPES.STADIUM]: 'Estádio',
  [STICKER_TYPES.SPECIAL]: 'Especial',
  [STICKER_TYPES.DOUBLE]: 'Dupla',
  [STICKER_TYPES.INTRO]: 'Intro',
};

export const TYPE_ICONS = {
  [STICKER_TYPES.PLAYER]: '⚽',
  [STICKER_TYPES.PHOTO]: '📸',
  [STICKER_TYPES.SHIELD]: '🛡️',
  [STICKER_TYPES.CRAQUE]: '⭐',
  [STICKER_TYPES.STADIUM]: '🏟️',
  [STICKER_TYPES.SPECIAL]: '✨',
  [STICKER_TYPES.DOUBLE]: '⭐',
  [STICKER_TYPES.INTRO]: '🏆',
};
