-- ==============================================================================
-- DubaiSafariDesert PostgreSQL Seed Data
-- ==============================================================================

-- Site Settings
INSERT INTO public.site_settings (
  business_name, phone, whatsapp, email, address, google_maps_url,
  instagram_url, facebook_url, support_hours, footer_description
) VALUES (
  'Safari Dune',
  '+971 50 123 4567',
  '+971 50 123 4567',
  '',
  'Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, UAE',
  'https://maps.google.com/?q=Dubai+Desert+Safari',
  'https://instagram.com/safaridunetours',
  'https://facebook.com/safaridunetours',
  'Open Daily: 08:00 AM – 11:00 PM (GST)',
  'Premier Dubai desert safari company offering authentic Arabian adventures, red dune bashing, luxury camps, and unforgettable Bedouin hospitality.'
) ON CONFLICT DO NOTHING;

-- Pickup Locations
INSERT INTO public.pickup_locations (name, active, sort_order) VALUES
('Downtown Dubai (Burj Khalifa area)', true, 1),
('Dubai Marina & JBR', true, 2),
('Business Bay', true, 3),
('Palm Jumeirah', true, 4),
('Deira & Dubai Creek', true, 5),
('Bur Dubai & Al Karama', true, 6),
('Al Barsha & Mall of Emirates', true, 7),
('Jumeirah Lake Towers (JLT)', true, 8),
('Dubai Hills Estate', true, 9)
ON CONFLICT DO NOTHING;

-- FAQs
INSERT INTO public.faqs (question, answer, category, active, sort_order) VALUES
('What is included in Dubai Desert Safari?', 'Includes round-trip hotel pickup in a 4x4 Land Cruiser, dune bashing on red dunes, sandboarding, camel ride, Arabic welcome with coffee & dates, BBQ buffet dinner (veg & non-veg), soft drinks, henna painting, and 3 live shows (Tanoura, Fire show, Belly dance).', 'General', true, 1),
('What time does the evening safari start?', 'Pickup is between 02:30 PM and 03:30 PM depending on your hotel location. The tour concludes around 08:30 PM with drop-off between 09:00 PM and 09:45 PM.', 'Timing', true, 2),
('Is hotel pickup available?', 'Yes! Complimentary door-to-door pickup and drop-off in a 4x4 Land Cruiser is included with all tours across Dubai, Sharjah, and Ajman.', 'Pickup', true, 3),
('Is desert safari suitable for children?', 'Yes, safaris are family-friendly. Gentle dune drives are provided for families with small kids, or you can choose a private vehicle.', 'Family & Safety', true, 4),
('What should I wear?', 'Comfortable casual clothes (cotton t-shirt, shorts or light trousers) and slip-on sandals. Bring a light jacket in winter months (Nov-March).', 'Preparation', true, 5),
('Can I book a private safari?', 'Yes, our VIP Private Safari provides an exclusive 4x4 vehicle with customized dune bashing and VIP lounge table service at the camp.', 'Packages', true, 6),
('Is dune bashing safe?', 'Completely safe. Our licensed safari marshals have specialized government certifications and all 4x4 vehicles feature roll cages and first-aid kits.', 'Safety', true, 7),
('Can I book through WhatsApp?', 'Yes! You can message us directly on WhatsApp to check availability, discuss custom options, and confirm your booking instantly.', 'Booking', true, 8),
('Can I request a custom package?', 'Yes, add-ons like quad biking, dune buggies, or private dining can easily be arranged on request.', 'Packages', true, 9),
('What is the cancellation policy?', 'Free cancellation up to 24 hours before your tour departure with zero cancellation penalty.', 'Booking', true, 10)
ON CONFLICT DO NOTHING;

-- Sample Reviews (Clearly identified as demo)
INSERT INTO public.reviews (customer_name, country, email, rating, comment, status, featured, is_demo) VALUES
('Sarah Jenkins', 'United Kingdom', 'sarah.j@example.com', 5, 'The evening desert safari exceeded all our expectations! The dune bashing was thrilling yet felt completely safe with our driver Rashid. The BBQ dinner was delicious and the fire show under the night sky was spectacular.', 'approved', true, true),
('Marco Rossi', 'Italy', 'm.rossi@example.com', 5, 'We booked the VIP Private Safari for my family of four. Booking was effortless over WhatsApp, pickup arrived exactly on time, and having our private Land Cruiser made the experience so comfortable for the kids.', 'approved', true, true),
('Elena Rostova', 'Germany', 'elena.rostova@example.com', 5, 'Stunning sunset photography and camel ride. The sandboarding was so much fun! Clean camp facilities, friendly staff, and very tasty vegetarian dishes at the buffet. Highly recommended.', 'approved', true, true)
ON CONFLICT DO NOTHING;
