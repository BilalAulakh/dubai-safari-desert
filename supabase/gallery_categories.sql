-- Gallery categories managed from the admin panel.
-- Run once in Supabase Dashboard -> SQL Editor.

CREATE TABLE IF NOT EXISTS public.gallery_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view gallery categories" ON public.gallery_categories;
DROP POLICY IF EXISTS "Admin full access gallery categories" ON public.gallery_categories;
CREATE POLICY "Public can view gallery categories" ON public.gallery_categories FOR SELECT USING (true);
CREATE POLICY "Admin full access gallery categories" ON public.gallery_categories FOR ALL USING (true) WITH CHECK (true);

INSERT INTO public.gallery_categories (slug, label, sort_order) VALUES
  ('desert', 'Desert Landscapes', 1),
  ('dune-bashing', 'Dune Bashing', 2),
  ('camp', 'Bedouin Camp', 3),
  ('food', 'BBQ & Dining', 4),
  ('entertainment', 'Live Shows', 5),
  ('activities', 'Activities', 6)
ON CONFLICT (slug) DO NOTHING;

-- Gallery photos can now use any category, not just the original six
ALTER TABLE public.gallery DROP CONSTRAINT IF EXISTS gallery_category_check;

-- Make sure the admin panel can read and write gallery photos
DROP POLICY IF EXISTS "Public can view gallery" ON public.gallery;
DROP POLICY IF EXISTS "Public can view active gallery items" ON public.gallery;
DROP POLICY IF EXISTS "Admin full access gallery" ON public.gallery;
CREATE POLICY "Public can view gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Admin full access gallery" ON public.gallery FOR ALL USING (true) WITH CHECK (true);
