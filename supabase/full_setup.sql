-- ==============================================================================
-- DUBAI SAFARI DESERT — COMPLETE SUPABASE DATABASE SETUP SCRIPT
-- Run this in Supabase Dashboard -> SQL Editor -> Click "Run"
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PACKAGES TABLE
CREATE TABLE IF NOT EXISTS public.packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  duration TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  main_image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  pickup_info TEXT DEFAULT 'Pickups available across all major Dubai hotels and apartments.',
  cancellation_policy TEXT DEFAULT 'Free cancellation up to 24 hours prior to departure.',
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PACKAGE INCLUSIONS & EXCLUSIONS & ITINERARY
CREATE TABLE IF NOT EXISTS public.package_inclusions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID REFERENCES public.packages(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.package_exclusions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID REFERENCES public.packages(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.package_itinerary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID REFERENCES public.packages(id) ON DELETE CASCADE,
  time TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- 3. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_reference TEXT UNIQUE NOT NULL,
  package_id TEXT NOT NULL,
  package_name TEXT,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  booking_date DATE NOT NULL,
  adults INT NOT NULL DEFAULT 1,
  children INT NOT NULL DEFAULT 0,
  pickup_location TEXT NOT NULL,
  hotel_name TEXT,
  special_requests TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'cancelled', 'completed')),
  admin_notes TEXT,
  payment_status TEXT DEFAULT 'unpaid',
  payment_method TEXT,
  paid_amount NUMERIC(10, 2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  highlights TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PICKUP LOCATIONS TABLE
CREATE TABLE IF NOT EXISTS public.pickup_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  country TEXT NOT NULL,
  email TEXT,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('desert', 'dune-bashing', 'camp', 'food', 'entertainment', 'activities')),
  active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL DEFAULT 'DubaiSafariDesert',
  phone TEXT NOT NULL DEFAULT '+971 50 123 4567',
  whatsapp TEXT NOT NULL DEFAULT '+971 50 123 4567',
  email TEXT NOT NULL DEFAULT 'info@dubaisafaridesert.com',
  address TEXT NOT NULL DEFAULT 'Downtown Dubai, United Arab Emirates',
  support_hours TEXT DEFAULT 'Open Daily: 08:00 AM – 11:00 PM (GST)',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_inclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_exclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_itinerary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pickup_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC POLICIES
CREATE POLICY "Public can view packages" ON public.packages FOR SELECT USING (true);
CREATE POLICY "Public can view package_inclusions" ON public.package_inclusions FOR SELECT USING (true);
CREATE POLICY "Public can view package_exclusions" ON public.package_exclusions FOR SELECT USING (true);
CREATE POLICY "Public can view package_itinerary" ON public.package_itinerary FOR SELECT USING (true);
CREATE POLICY "Public can view activities" ON public.activities FOR SELECT USING (true);
CREATE POLICY "Public can view pickup_locations" ON public.pickup_locations FOR SELECT USING (true);
CREATE POLICY "Public can view approved reviews" ON public.reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Public can submit review" ON public.reviews FOR INSERT WITH CHECK (status = 'pending');
CREATE POLICY "Public can view faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Public can view gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can create booking request" ON public.bookings FOR INSERT WITH CHECK (status = 'pending');

-- ADMIN FULL ACCESS (Via authenticated or anon for demo)
CREATE POLICY "Admin full access packages" ON public.packages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access inclusions" ON public.package_inclusions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access exclusions" ON public.package_exclusions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access itinerary" ON public.package_itinerary FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access bookings" ON public.bookings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access activities" ON public.activities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access pickup_locations" ON public.pickup_locations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access reviews" ON public.reviews FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access faqs" ON public.faqs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access gallery" ON public.gallery FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access site_settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- STORAGE POLICIES FOR 'safari-images' BUCKET
-- ==============================================================================
CREATE POLICY "Public view safari-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'safari-images');

CREATE POLICY "Allow uploads to safari-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'safari-images');

CREATE POLICY "Allow update safari-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'safari-images');

CREATE POLICY "Allow delete safari-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'safari-images');

-- ==============================================================================
-- INITIAL SEED DATA (Dubai Safari Tour Packages)
-- ==============================================================================
INSERT INTO public.packages (name, slug, short_description, description, price, duration, featured, active, main_image)
VALUES 
(
  'Evening Desert Safari with BBQ Dinner',
  'evening-desert-safari',
  'Dubai''s signature desert adventure: high red dune bashing, camel trek, 5-star BBQ buffet, and spectacular fire shows.',
  'Experience the timeless magic of the Lahbab red dunes with our premier evening desert safari. Includes 4x4 pickup, camel riding, sandboarding, and a full evening of entertainment at our Bedouin fortress.',
  150.00,
  '6 - 7 Hours',
  true,
  true,
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'
),
(
  'Morning Desert Safari & Sunrise Dune Bashing',
  'morning-desert-safari',
  'Witness golden morning rays illuminating pristine sand dunes, followed by energetic dune bashing and sandboarding.',
  'Perfect for early risers and photography enthusiasts. Depart at dawn in a luxury 4x4 Land Cruiser for the Lahbab dunes, enjoy peaceful sandboarding, and return by midday.',
  120.00,
  '4 Hours',
  false,
  true,
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop'
),
(
  'VIP Private Desert Safari Experience',
  'private-desert-safari',
  'Exclusive private Land Cruiser, personalized pickup, VIP table seating with dedicated server, and premium BBQ menu.',
  'Tailored for couples, families, and executive groups desiring total privacy and luxury. Your dedicated safari marshal ensures a personalized tour pace.',
  850.00,
  '6 - 7 Hours',
  true,
  true,
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop'
),
(
  'Quad Bike & Dune Buggy Adventure',
  'quad-bike-desert-safari',
  'Take command of high-powered 400cc Yamaha quad bikes or Polaris RZR dune buggies across expansive open dunes.',
  'Designed for thrill-seekers who want hands-on desert driving experience. Full safety gear, orientation, and marshals included.',
  220.00,
  '5 Hours',
  true,
  true,
  'https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=1200&auto=format&fit=crop'
),
(
  'Overnight Desert Safari & Stargazing Camp',
  'overnight-desert-safari',
  'Evening dune bashing and BBQ dinner followed by sleeping under a canopy of desert stars in traditional Bedouin tents.',
  'An unforgettable desert sleepover with breakfast at sunrise, midnight campfires, and peaceful desert silence.',
  280.00,
  '18 Hours (Overnight)',
  false,
  true,
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop'
)
ON CONFLICT (slug) DO NOTHING;

-- INITIAL PICKUP LOCATIONS
INSERT INTO public.pickup_locations (name, active, sort_order)
VALUES 
('Downtown Dubai & Business Bay (Burj Khalifa area)', true, 1),
('Dubai Marina & JBR (Jumeirah Beach Residence)', true, 2),
('Palm Jumeirah & Madinat Jumeirah', true, 3),
('Deira & Bur Dubai (Historic Old Dubai)', true, 4),
('Al Barsha & Mall of the Emirates area', true, 5),
('Dubai Creek Harbour & Festival City', true, 6)
ON CONFLICT DO NOTHING;
