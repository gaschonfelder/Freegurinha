/**
 * FREEGURINHA — build.js
 * 1. Baixa o Supabase SDK e serve localmente (sem CDN externo)
 * 2. Injeta variáveis de ambiente nos HTMLs
 * 3. Gera dist/
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

// ── 1. Carregar variáveis ─────────────────────────────────────
let SUPABASE_URL = process.env.SUPABASE_URL;
let SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  const envPath = path.resolve('.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach((line) => {
      const cleanLine = line.trim().replace(/,$/, '');
      if (!cleanLine || cleanLine.startsWith('#')) return;
      const separator = cleanLine.includes('=')
        ? '='
        : cleanLine.includes(':')
          ? ':'
          : null;
      if (!separator) return;
      const [key, ...rest] = cleanLine.split(separator);
      const val = rest
        .join(separator)
        .trim()
        .replace(/^["']|["']$/g, '');
      if (key.trim() === 'SUPABASE_URL') SUPABASE_URL = val;
      if (key.trim() === 'SUPABASE_KEY') SUPABASE_KEY = val;
    });
  }
}

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ SUPABASE_URL e SUPABASE_KEY são obrigatórias.');
  process.exit(1);
}

console.log(`✅ SUPABASE_URL: ${SUPABASE_URL}`);
console.log(`✅ SUPABASE_KEY: ${SUPABASE_KEY.slice(0, 20)}...`);

// ── 2. Download do Supabase SDK ───────────────────────────────
function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return download(res.headers.location).then(resolve).catch(reject);
        }
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

// ── 3. Criar pasta dist/ ──────────────────────────────────────
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

if (fs.existsSync('dist')) fs.rmSync('dist', { recursive: true });
fs.mkdirSync('dist');

const IGNORE = [
  '.env.local',
  '.env',
  'node_modules',
  'dist',
  '.vercel',
  '.git',
  'build.js',
  'package.json',
  'package-lock.json',
];
for (const entry of fs.readdirSync('.', { withFileTypes: true })) {
  if (IGNORE.includes(entry.name) || entry.name.startsWith('.')) continue;
  const dest = path.join('dist', entry.name);
  if (entry.isDirectory()) copyDir(entry.name, dest);
  else fs.copyFileSync(entry.name, dest);
}

// ── 4. Baixar Supabase SDK e salvar em dist/public/assets/ ───
const SDK_URL =
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
const SDK_PATH = 'dist/public/assets/supabase.min.js';

console.log('⬇️  Baixando Supabase SDK...');
try {
  const sdk = await download(SDK_URL);
  fs.mkdirSync('dist/public/assets', { recursive: true });
  fs.writeFileSync(SDK_PATH, sdk);
  console.log(
    `✅ Supabase SDK: ${(sdk.length / 1024).toFixed(0)}KB → ${SDK_PATH}`,
  );
} catch (e) {
  console.warn(
    `⚠️  Falha ao baixar SDK (${e.message}) — usando CDN como fallback`,
  );
}

// ── 5. Injetar variáveis e trocar CDN por local ───────────────
const CDN_URL =
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js';
const CDN_MIN =
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
const LOCAL_SDK = '/public/assets/supabase.min.js';

const HTML_FILES = ['dist/pages/app.html', 'dist/pages/login.html'];
let count = 0;
for (const file of HTML_FILES) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  content = content
    .replaceAll('__SUPABASE_URL__', SUPABASE_URL)
    .replaceAll('__SUPABASE_KEY__', SUPABASE_KEY)
    .replace(CDN_URL, LOCAL_SDK)
    .replace(CDN_MIN, LOCAL_SDK);
  fs.writeFileSync(file, content);
  count++;
  console.log(`  ✅ ${file}`);
}

console.log(`\n🚀 Build completo — ${count} arquivos processados → dist/`);
