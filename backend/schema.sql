-- ╔══════════════════════════════════════════════════════════╗
-- ║  FREEGURINHA — Schema do banco de dados                 ║
-- ║  Execute no SQL Editor do Supabase                      ║
-- ║  Dashboard → SQL Editor → New Query → Cole e rode       ║
-- ╚══════════════════════════════════════════════════════════╝

-- ─────────────────────────────────────────────────────────────
-- 1. PERFIS DE USUÁRIO
--    Extensão da tabela auth.users do Supabase
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT,
  phone       TEXT,                        -- para WhatsApp futuro
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: cria perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- 2. ÁLBUM DO USUÁRIO
--    Uma linha por figurinha por usuário
--    qty = 0 (faltando) | 1 (tenho) | 2+ (repetida)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.album (
  id          BIGSERIAL   PRIMARY KEY,
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sticker_id  TEXT        NOT NULL,        -- ex: "BRA-01", "BRA-CRQ", "EST-MET"
  qty         SMALLINT    NOT NULL DEFAULT 0 CHECK (qty >= 0),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE (user_id, sticker_id)             -- um registro por figurinha por usuário
);

-- Índices para buscas rápidas
CREATE INDEX IF NOT EXISTS album_user_id_idx ON public.album (user_id);
CREATE INDEX IF NOT EXISTS album_sticker_id_idx ON public.album (sticker_id);

-- Trigger: atualiza updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS album_updated_at ON public.album;
CREATE TRIGGER album_updated_at
  BEFORE UPDATE ON public.album
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ─────────────────────────────────────────────────────────────
-- 3. ROW LEVEL SECURITY (RLS)
--    Cada usuário só vê e edita seus próprios dados
-- ─────────────────────────────────────────────────────────────

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios veem proprio perfil"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Usuarios editam proprio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Album
ALTER TABLE public.album ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios veem proprio album"
  ON public.album FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuarios inserem no proprio album"
  ON public.album FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios atualizam proprio album"
  ON public.album FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuarios deletam do proprio album"
  ON public.album FOR DELETE
  USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- 4. FUNÇÃO UPSERT — atualiza ou insere figurinha
--    Chame pelo frontend: rpc('upsert_sticker', {...})
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.upsert_sticker(
  p_sticker_id TEXT,
  p_qty        SMALLINT
)
RETURNS void AS $$
BEGIN
  INSERT INTO public.album (user_id, sticker_id, qty)
  VALUES (auth.uid(), p_sticker_id, p_qty)
  ON CONFLICT (user_id, sticker_id)
  DO UPDATE SET qty = EXCLUDED.qty, updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─────────────────────────────────────────────────────────────
-- 5. VIEW — resumo por usuário (útil para stats)
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW public.album_stats AS
SELECT
  user_id,
  COUNT(*) FILTER (WHERE qty  = 0) AS missing,
  COUNT(*) FILTER (WHERE qty  = 1) AS owned,
  COUNT(*) FILTER (WHERE qty >= 2) AS duplicates,
  SUM(qty - 1) FILTER (WHERE qty >= 2) AS extra_stickers,
  MAX(updated_at) AS last_updated
FROM public.album
GROUP BY user_id;

-- Permissão para a view
ALTER VIEW public.album_stats OWNER TO postgres;

-- ─────────────────────────────────────────────────────────────
-- PRONTO — verifique em Table Editor que as tabelas aparecem:
--   ✅ profiles
--   ✅ album
-- ─────────────────────────────────────────────────────────────