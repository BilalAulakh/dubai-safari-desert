-- ==============================================================================
-- Safari Dune Tours: Blog CMS Table & RLS Setup
-- ==============================================================================

-- 1. Create the blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  featured_image_alt TEXT,
  meta_title TEXT,
  meta_description TEXT,
  category TEXT DEFAULT 'Desert Safari',
  author TEXT DEFAULT 'Safari Dune Tours',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create performance indexes
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON public.blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON public.blogs(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON public.blogs(category);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies:
-- Public can ONLY view published blogs (drafts remain strictly confidential)
DROP POLICY IF EXISTS "Public can view published blogs" ON public.blogs;
CREATE POLICY "Public can view published blogs"
  ON public.blogs
  FOR SELECT
  USING (status = 'published');

-- Allow all operations for anon/authenticated (Admin portal CRUD)
DROP POLICY IF EXISTS "Allow full access for admin and service" ON public.blogs;
CREATE POLICY "Allow full access for admin and service"
  ON public.blogs
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 5. Seed initial published blog articles
INSERT INTO public.blogs (
  title,
  slug,
  excerpt,
  content,
  featured_image,
  featured_image_alt,
  meta_title,
  meta_description,
  category,
  author,
  status,
  published_at,
  created_at,
  updated_at
) VALUES
(
  'What to Wear for Dubai Desert Safari: Essential Dress Code & Packing Tips',
  'what-to-wear-for-dubai-desert-safari',
  'Ensure maximum comfort on the red dunes with expert advice on footwear, breathable fabrics, sunglasses, cultural etiquette, and evening layering.',
  'Selecting the right attire for your Dubai desert safari will keep you comfortable during active dune bashing, camel rides, and sandboarding, as well as while relaxing at the desert camp.

### 1. Breathable, Loose-Fitting Fabrics
Opt for lightweight natural fabrics like cotton, linen, or moisture-wicking athletic wear. Loose t-shirts, relaxed trousers, or knee-length shorts are ideal. Avoid tight synthetic clothing that traps humidity.

### 2. Footwear: Sandals or Slip-On Shoes
Fine Arabian sand easily penetrates sneakers and socks. Open sandals, flip-flops, or lightweight slip-on shoes make it effortless to empty sand after sandboarding or camel trekking. If you plan on quad biking, closed shoes are recommended for pedal grip.

### 3. Sun Protection Essentials
- **Sunglasses:** UV400 polarized sunglasses to guard against midday glare.
- **Sunscreen:** SPF 50+ broad-spectrum sunscreen applied before pickup.
- **Headwear:** A wide-brim sunhat or traditional keffiyeh (Arabian headscarf available at camp).

### 4. Evening Layers (November to March)
The desert temperature drops noticeably once the sun dips below the horizon. If visiting between November and March, bring a light jacket, cardigan, or pashmina shawl for the dinner buffet and fire show.

### 5. Cultural Modesty Guidelines
Dubai is welcoming and cosmopolitan. While casual holiday attire is completely fine on the dunes, respect local traditions by avoiding excessively revealing swimwear or micro-shorts at the family camp.',
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop',
  'Visitor walking across golden Dubai desert dunes wearing light linen clothing',
  'What to Wear for Dubai Desert Safari | Dress Code & Packing Guide',
  'Comprehensive guide on what to wear for a Dubai desert safari. Discover footwear tips, breathable fabrics, sun protection, evening layers, and cultural guidelines.',
  'Travel Guide',
  'Tariq Al-Mansoor',
  'published',
  '2026-08-18T10:00:00Z',
  '2026-08-18T10:00:00Z',
  '2026-08-18T10:00:00Z'
),
(
  'Morning vs Evening Desert Safari in Dubai: Which Experience is Right for You?',
  'morning-vs-evening-desert-safari',
  'Compare highlights, itineraries, dining, entertainment, and pricing to decide between a morning sunrise safari or an evening dinner safari.',
  'First-time visitors to Dubai often ask: "Should I book the Morning Safari or the Evening Safari?" Both offer magnificent views of the Arabian dunes, but they cater to very different schedules and travel styles.

### Morning Desert Safari: Pure Adventure & Crisp Sunrise
The morning safari is tailored for travelers who want action-packed desert adventures with minimal downtime.
- **Duration:** 4 to 5 hours (07:30 AM – 12:00 PM)
- **Top Highlights:** Golden sunrise over pristine red dunes, 35-minute intense 4x4 dune bashing, sandboarding, short camel ride, and optional quad biking.
- **Who it is for:** Adventure seekers, photographers wanting morning light, business travelers with evening engagements, or those with late-night flights.

### Evening Desert Safari: The Full Arabian Night
The evening safari is the quintessential Dubai tourism experience, blending thrilling sports with rich Bedouin cultural immersion.
- **Duration:** 6 to 7 hours (02:30 PM – 09:30 PM)
- **Top Highlights:** Sunset photography on high dunes, 40-minute dune bashing, camel rides, henna artistry, international 5-star BBQ dinner buffet, Tanoura dance, fire show, and belly dancing.
- **Who it is for:** Families, couples, vacationers, and first-time Dubai visitors seeking a complete, relaxed cultural night.

### Summary: How to Choose
- If your schedule is tight and you want adventure: **Book Morning Safari**.
- If you want the complete Dubai experience with dinner and live shows: **Book Evening Safari**.',
  'https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=1200&auto=format&fit=crop',
  'Golden sunset over Dubai desert safari camp with traditional Arabian lanterns',
  'Morning vs Evening Desert Safari Dubai | Comparison Guide',
  'Deciding between a morning vs evening desert safari in Dubai? Read our detailed head-to-head comparison of timings, activities, entertainment, and BBQ dinners.',
  'Comparison',
  'Elena Rostova',
  'published',
  '2026-08-25T10:00:00Z',
  '2026-08-25T10:00:00Z',
  '2026-08-25T10:00:00Z'
),
(
  'Best Desert Safari in Dubai for Families: Kids, Safety & Top Tips',
  'best-desert-safari-in-dubai-for-families',
  'A parent''s guide to family-friendly safaris: baby seat availability, gentle dune rides, kid-friendly camp dining, and private vehicle options.',
  'A desert safari is one of the most memorable family experiences you can share in the United Arab Emirates. With gentle camel rides, fascinating fire shows, and endless sand for kids to run on, children of all ages have an unforgettable time.

### Age Guidelines & Recommendations
- **Children aged 4 and above:** Generally love the rollercoaster thrills of dune bashing, sandboarding, and stage entertainment.
- **Toddlers and Infants (under 3 years):** High-speed dune bashing is not recommended for infants due to sudden lateral motion. However, families with toddlers can book a **gentle scenic dune drive** or our **VIP Private Safari vehicle**, where the driver drives along smooth desert trails directly to the camp.

### Safety Standards You Can Trust
- All Safari Dune Tours Land Cruisers feature internal roll-cages, GPS navigation, and passenger insurance.
- Baby car seats and booster seats are available upon advance reservation request.
- Our drivers hold DTCM commercial desert driving licenses and first-aid certification.

### Kid-Friendly Dining at Camp
Our evening buffet includes universally loved choices such as grilled chicken skewers, crispy potato wedges, pasta, flatbreads, and fresh fruit platters.',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
  'Family enjoying a camel ride together across Dubai desert dunes during sunset',
  'Best Desert Safari in Dubai for Families | Kids Guide & Safety',
  'Explore the best desert safari in Dubai for families with children and seniors. Learn about gentle dune drives, kid-friendly camp activities, and private car options.',
  'Family Safari',
  'Sarah Jenkins',
  'published',
  '2026-09-02T10:00:00Z',
  '2026-09-02T10:00:00Z',
  '2026-09-02T10:00:00Z'
),
(
  '10 Best Things to Do in the Dubai Desert: Ultimate Adventure Guide',
  'things-to-do-in-dubai-desert',
  'From high-octane 4x4 red dune bashing and ATV quad biking to serene camel trekking and stargazing BBQ buffets, explore the top 10 desert activities.',
  'The Arabian desert surrounding Dubai is an extraordinary natural playground. Here are the 10 best activities every traveler should experience on a Dubai desert safari with Safari Dune Tours:

### 1. 4x4 Red Dune Bashing
Experience high-speed adrenaline as skilled desert marshals drift up and down the sweeping 300-foot red dunes of Lahbab in customized Land Cruisers.

### 2. Sandboarding Down Giant Dunes
Strap on a custom sandboard and glide down silky sand waves. It is safe, exhilarating, and suitable for all skill levels.

### 3. Sunset Photography Over Golden Dunes
As the late afternoon sun dips below the horizon, the sand transforms into glowing shades of amber and gold. Our drivers stop at the highest dunes for breathtaking photography.

### 4. Traditional Camel Trekking
Climb aboard the "ship of the desert" for a peaceful caravan trek across the sands, just as Bedouin nomads traveled for generations.

### 5. High-Power Quad Biking & Dune Buggies
Take control of powerful 400cc ATVs or 1000cc turbo Can-Am buggies in a dedicated open-desert track equipped with full safety gear.

### 6. Henna Hand Artistry
Adorn your hands with delicate, traditional henna floral patterns created by skilled Arabic artists at the Bedouin camp.

### 7. Authentic Gahwa Coffee & Fresh Dates
Experience true Emirati hospitality with a warm cup of cardamom-infused Arabian coffee and organic local dates upon arrival.

### 8. 5-Star International BBQ Buffet Dinner
Savor flame-grilled chicken shish taouk, lamb kofta, fresh tabbouleh, hummus, pasta, and traditional sweets under the Arabian stars.

### 9. Mesmerizing Tanoura & Fire Shows
Watch the hypnotic spinning of Sufi Tanoura dancers in LED costumes, followed by an electrifying live fire dance spectacle.

### 10. Overnight Stargazing Under Quiet Desert Skies
Extend your evening safari into an overnight campout with private tents, campfire stargazing, and a fresh sunrise breakfast.',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
  'Adventure seekers quad biking on red desert dunes in Dubai during morning safari',
  '10 Best Things to Do in Dubai Desert | Safari Adventure Guide',
  'From thrilling 4x4 red dune bashing and quad biking to camel trekking and stargazing BBQ camps, discover the top 10 things to do in the Dubai desert.',
  'Adventure',
  'Tariq Al-Mansoor',
  'published',
  '2026-09-10T10:00:00Z',
  '2026-09-10T10:00:00Z',
  '2026-09-10T10:00:00Z'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  featured_image = EXCLUDED.featured_image,
  featured_image_alt = EXCLUDED.featured_image_alt,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at,
  updated_at = NOW();
