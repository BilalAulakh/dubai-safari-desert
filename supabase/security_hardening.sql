-- ==============================================================================
-- SECURITY HARDENING (run once in the Supabase SQL Editor)
--
-- BEFORE running: set SUPABASE_SERVICE_ROLE_KEY in Vercel and redeploy.
-- The server then talks to the database with the service role key (which
-- bypasses RLS), so the public anon key only needs to read public content.
--
-- What this does:
--   1. Removes every existing policy on the site tables (the old ones let the
--      public anon key read all bookings and edit/delete everything).
--   2. Lets the anon key read only public content (active / approved / published).
--   3. Gives anon NO access to bookings at all, and no insert/update/delete anywhere.
--   4. Makes the safari-images bucket public-read only; uploads go through the
--      admin API with the service role key.
-- Safe to re-run.
-- ==============================================================================

DO $$
DECLARE
  t text;
  pol record;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'packages', 'package_inclusions', 'package_exclusions', 'package_itinerary',
    'bookings', 'activities', 'pickup_locations', 'reviews', 'comments', 'faqs',
    'gallery', 'gallery_categories', 'site_settings', 'blogs', 'blog_posts'
  ]
  LOOP
    IF to_regclass('public.' || t) IS NOT NULL THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
      FOR pol IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = t
      LOOP
        EXECUTE format('DROP POLICY %I ON public.%I', pol.policyname, t);
      END LOOP;
    END IF;
  END LOOP;
END $$;

-- Public read access (only what the website shows)
DO $$
BEGIN
  IF to_regclass('public.packages') IS NOT NULL THEN
    CREATE POLICY "Public read packages" ON public.packages FOR SELECT TO anon USING (active = true);
  END IF;
  IF to_regclass('public.package_inclusions') IS NOT NULL THEN
    CREATE POLICY "Public read package_inclusions" ON public.package_inclusions FOR SELECT TO anon USING (true);
  END IF;
  IF to_regclass('public.package_exclusions') IS NOT NULL THEN
    CREATE POLICY "Public read package_exclusions" ON public.package_exclusions FOR SELECT TO anon USING (true);
  END IF;
  IF to_regclass('public.package_itinerary') IS NOT NULL THEN
    CREATE POLICY "Public read package_itinerary" ON public.package_itinerary FOR SELECT TO anon USING (true);
  END IF;
  IF to_regclass('public.activities') IS NOT NULL THEN
    CREATE POLICY "Public read activities" ON public.activities FOR SELECT TO anon USING (active = true);
  END IF;
  IF to_regclass('public.pickup_locations') IS NOT NULL THEN
    CREATE POLICY "Public read pickup_locations" ON public.pickup_locations FOR SELECT TO anon USING (active = true);
  END IF;
  IF to_regclass('public.reviews') IS NOT NULL THEN
    CREATE POLICY "Public read approved reviews" ON public.reviews FOR SELECT TO anon USING (status = 'approved');
  END IF;
  IF to_regclass('public.comments') IS NOT NULL THEN
    CREATE POLICY "Public read approved comments" ON public.comments FOR SELECT TO anon USING (status = 'approved');
  END IF;
  IF to_regclass('public.faqs') IS NOT NULL THEN
    CREATE POLICY "Public read faqs" ON public.faqs FOR SELECT TO anon USING (active = true);
  END IF;
  IF to_regclass('public.gallery') IS NOT NULL THEN
    CREATE POLICY "Public read gallery" ON public.gallery FOR SELECT TO anon USING (active = true);
  END IF;
  IF to_regclass('public.gallery_categories') IS NOT NULL THEN
    CREATE POLICY "Public read gallery_categories" ON public.gallery_categories FOR SELECT TO anon USING (true);
  END IF;
  IF to_regclass('public.site_settings') IS NOT NULL THEN
    CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT TO anon USING (true);
  END IF;
  IF to_regclass('public.blogs') IS NOT NULL THEN
    CREATE POLICY "Public read published blogs" ON public.blogs FOR SELECT TO anon USING (status = 'published');
  END IF;
  IF to_regclass('public.blog_posts') IS NOT NULL THEN
    CREATE POLICY "Public read published blog_posts" ON public.blog_posts FOR SELECT TO anon USING (status = 'published');
  END IF;
  -- bookings: intentionally no anon policy (customer data stays private)
END $$;

-- Storage: anyone can view images, nobody but the server can change them
DROP POLICY IF EXISTS "Public view safari-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow uploads to safari-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow update safari-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete safari-images" ON storage.objects;

CREATE POLICY "Public view safari-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'safari-images');
