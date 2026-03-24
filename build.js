/**
 * FREEGURINHA — build.js
 * Injeta variáveis de ambiente nos arquivos HTML antes do deploy.
 *
 * Como funciona:
 *   1. Lê .env.local (desenvolvimento) ou variáveis do ambiente (Vercel)
 *   2. Substitui __SUPABASE_URL__ e __SUPABASE_KEY__ nos HTMLs
 *   3. Salva os arquivos prontos na pasta dist/
 *
 * Uso:
 *   npm run build   → gera dist/ para deploy
 *   npm run dev     → serve local com variáveis injetadas
 */

import fs from 'fs';
import path from 'path';

// ── 1. Carregar variáveis ─────────────────────────────────────
// Em produção (Vercel): lê do process.env
// Em desenvolvimento:   lê do .env.local
let SUPABASE_URL = process.env.SUPABASE_URL;
let SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  // Tenta carregar .env.local
  const envPath = path.resolve('.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach((line) => {
      const [key, ...rest] = line.split('=');
      const val = rest
        .join('=')
        .trim()
        .replace(/^["']|["']$/g, '');
      if (key.trim() === 'SUPABASE_URL') SUPABASE_URL = val;
      if (key.trim() === 'SUPABASE_KEY') SUPABASE_KEY = val;
    });
  }
}

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ SUPABASE_URL e SUPABASE_KEY são obrigatórias.');
  console.error('   Crie um arquivo .env.local com essas variáveis.');
  process.exit(1);
}

console.log(`✅ SUPABASE_URL: ${SUPABASE_URL}`);
console.log(`✅ SUPABASE_KEY: ${SUPABASE_KEY.slice(0, 20)}...`);

// ── 2. Criar pasta dist/ ──────────────────────────────────────
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Limpa e recria dist/
if (fs.existsSync('dist')) fs.rmSync('dist', { recursive: true });
fs.mkdirSync('dist');

// Copia tudo exceto arquivos de desenvolvimento
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
  if (entry.isDirectory()) {
    copyDir(entry.name, dest);
  } else {
    fs.copyFileSync(entry.name, dest);
  }
}

// ── 3. Injetar variáveis nos HTMLs ────────────────────────────
const HTML_FILES = ['dist/pages/app.html', 'dist/pages/login.html'];

let count = 0;
for (const file of HTML_FILES) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  content = content
    .replaceAll('__SUPABASE_URL__', SUPABASE_URL)
    .replaceAll('__SUPABASE_KEY__', SUPABASE_KEY);
  fs.writeFileSync(file, content);
  count++;
  console.log(`  ✅ ${file}`);
}

console.log(`\n🚀 Build completo — ${count} arquivos processados → dist/`);
