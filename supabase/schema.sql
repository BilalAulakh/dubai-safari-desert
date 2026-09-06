-- ==============================================================================
-- DubaiSafariDesert PostgreSQL Schema & Row Level Security (RLS) Policies
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PACKAGES
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
  pickup_info TEXT,
  cancellation_policy TEXT,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PACKAGE INCLUSIONS
CREATE TABLE IF NOT EXISTS public.package_inclusions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID REFERENCES public.packages(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PACKAGE EXCLUSIONS
CREATE TABLE IF NOT EXISTS public.package_exclusions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID REFERENCES public.packages(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PACKAGE ITINERARY
CREATE TABLE IF NOT EXISTS public.package_itinerary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID REFERENCES public.packages(id) ON DELETE CASCADE,
  time TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- 5. BOOKINGS (Inquiry Based, Ready for Future Online Payment)
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
  -- Future Payment Architecture Fields (Not used in v1)
  payment_status TEXT DEFAULT 'unpaid',
  payment_method TEXT,
  payment_reference TEXT,
  paid_amount NUMERIC(10, 2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ACTIVITIES
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

-- 7. PICKUP LOCATIONS
CREATE TABLE IF NOT EXISTS public.pickup_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. REVIEWS
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
  is_demo BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. BLOG COMMENTS
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  comment TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. FAQS
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

-- 11. GALLERY
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

-- 12. SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL DEFAULT 'DubaiSafariDesert',
  phone TEXT NOT NULL DEFAULT '+971 50 123 4567',
  whatsapp TEXT NOT NULL DEFAULT '+971 50 123 4567',
  email TEXT NOT NULL DEFAULT 'info@dubaisafaridesert.com',
  address TEXT NOT NULL DEFAULT 'Downtown Dubai, UAE',
  google_maps_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  support_hours TEXT DEFAULT 'Open Daily: 08:00 AM – 11:00 PM (GST)',
  logo_url TEXT,
  footer_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. BLOG POSTS
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT NOT NULL,
  author TEXT NOT NULL,
  published_date DATE DEFAULT CURRENT_DATE,
  read_time TEXT DEFAULT '5 min read',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================================================

ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_inclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_exclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_itinerary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pickup_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- PUBLIC SELECT POLICIES (Read-only for active/approved content)
CREATE POLICY "Public can view active packages" ON public.packages FOR SELECT USING (active = true);
CREATE POLICY "Public can view active inclusions" ON public.package_inclusions FOR SELECT USING (true);
CREATE POLICY "Public can view active exclusions" ON public.package_exclusions FOR SELECT USING (true);
CREATE POLICY "Public can view package itinerary" ON public.package_itinerary FOR SELECT USING (true);
CREATE POLICY "Public can view active activities" ON public.activities FOR SELECT USING (active = true);
CREATE POLICY "Public can view active pickup locations" ON public.pickup_locations FOR SELECT USING (active = true);
CREATE POLICY "Public can view approved reviews" ON public.reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Public can view approved comments" ON public.comments FOR SELECT USING (status = 'approved');
CREATE POLICY "Public can view active faqs" ON public.faqs FOR SELECT USING (active = true);
CREATE POLICY "Public can view active gallery items" ON public.gallery FOR SELECT USING (active = true);
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view published blog posts" ON public.blog_posts FOR SELECT USING (status = 'published');

-- PUBLIC INSERT POLICIES (Create pending inquiries, reviews, comments)
CREATE POLICY "Public can create booking request" ON public.bookings FOR INSERT WITH CHECK (status = 'pending');
CREATE POLICY "Public can submit review" ON public.reviews FOR INSERT WITH CHECK (status = 'pending');
CREATE POLICY "Public can submit comment" ON public.comments FOR INSERT WITH CHECK (status = 'pending');

-- AUTHENTICATED ADMIN POLICIES (Full CRUD)
CREATE POLICY "Admin full access packages" ON public.packages TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access inclusions" ON public.package_inclusions TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access exclusions" ON public.package_exclusions TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access itinerary" ON public.package_itinerary TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access bookings" ON public.bookings TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access activities" ON public.activities TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access pickup_locations" ON public.pickup_locations TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access reviews" ON public.reviews TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access comments" ON public.comments TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access faqs" ON public.faqs TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access gallery" ON public.gallery TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access site_settings" ON public.site_settings TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access blog_posts" ON public.blog_posts TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- 7. STORAGE BUCKET POLICIES (safari-images)
-- ==============================================================================
-- Allow anyone to view images from public bucket safari-images
CREATE POLICY "Public view safari-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'safari-images');

-- Allow uploads to safari-images bucket
CREATE POLICY "Allow uploads to safari-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'safari-images');

-- Allow updates and deletes to safari-images
CREATE POLICY "Allow update safari-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'safari-images');

CREATE POLICY "Allow delete safari-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'safari-images');
