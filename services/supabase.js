/**
 * FREEGURINHA — services/supabase.js
 * Cliente Supabase — importar em todos os outros serviços
 *
 * Configure as variáveis de ambiente:
 *   SUPABASE_URL  → Dashboard → Settings → API → Project URL
 *   SUPABASE_KEY  → Dashboard → Settings → API → anon public key
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// ── Configuração ──────────────────────────────────────────────
// Em produção: use variáveis de ambiente via Vercel
// Em desenvolvimento local: substitua diretamente aqui
const SUPABASE_URL = 'https://suufdiusvkniznebowqg.supabase.co';
//window.__ENV__?.SUPABASE_URL || 'https://suufdiusvkniznebowqg.supabase.co'; // ← substituir

const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1dWZkaXVzdmtuaXpuZWJvd3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNzU5ODcsImV4cCI6MjA4OTk1MTk4N30.qZqyqg4GJ3WERCfi1k3b8CsIEfu8Jx8nHom4tgzqSXk';
//window.__ENV__?.SUPABASE_KEY || 'SUA_ANON_PUBLIC_KEY'; // ← substituir

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    // Persiste sessão no localStorage automaticamente
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true, // captura token do redirect OAuth
  },
});

// Expõe globalmente para uso no app.html (sem bundler)
window._supabase = supabase;
