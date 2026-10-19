-- Removes stock photos that have nothing to do with a desert safari (earth from space,
-- a US road trip, concerts, a neon sign, a forest, Jordan's Wadi Rum, a cafe, a Canadian
-- lake, the Dubai skyline) from the live data. Run once in Supabase -> SQL Editor.
-- Safe to re-run.

-- 1) Package galleries: drop the wrong photos, keep everything else
UPDATE public.packages
SET gallery = ARRAY(
  SELECT g FROM unnest(gallery) AS g
  WHERE g !~ 'photo-(1451187580459|1469854523086|1492684223066|1508700115892|1509316975850|1516450360452|1547234935|1555396273|1610878180933)-'
)
WHERE array_to_string(gallery, ' ') ~ 'photo-(1451187580459|1469854523086|1492684223066|1508700115892|1509316975850|1516450360452|1547234935|1555396273|1610878180933)-';

-- A package whose main photo is one of them gets the dune-bashing hero photo
UPDATE public.packages
SET main_image = '/images/hero-dune-bashing.webp'
WHERE main_image ~ 'photo-(1451187580459|1469854523086|1492684223066|1508700115892|1509316975850|1516450360452|1547234935|1555396273|1610878180933)-';

-- 2) Activities: a photo that matches each activity
UPDATE public.activities SET image = CASE
  WHEN image ~ 'photo-1547234935-'    THEN 'https://images.unsplash.com/photo-1588310558566-b983c7d257e4?q=80&w=1200&auto=format&fit=crop'
  WHEN image ~ 'photo-1451187580459-' THEN 'https://images.unsplash.com/photo-1553796661-17b7fa359f49?q=80&w=1200&auto=format&fit=crop'
  WHEN image ~ 'photo-1469854523086-' THEN 'https://images.unsplash.com/photo-1494674557684-c26be0f88950?q=80&w=1200&auto=format&fit=crop'
  WHEN image ~ 'photo-1555396273-'    THEN '/images/tours/vip-evening-desert-safari-dubai.webp'
  WHEN image ~ 'photo-1516450360452-' THEN 'https://images.unsplash.com/photo-1565081189012-7f02978bc81c?q=80&w=1200&auto=format&fit=crop'
  WHEN image ~ 'photo-1492684223066-' THEN 'https://images.unsplash.com/photo-1619611048223-fc8569ab767a?q=80&w=1200&auto=format&fit=crop'
  WHEN image ~ 'photo-1508700115892-' THEN '/images/tours/over-night-desert-safari-dubai.webp'
  WHEN image ~ 'photo-1512453979798-' THEN '/images/tours/over-night-desert-safari-dubai.webp'
  WHEN image ~ 'photo-1610878180933-' THEN 'https://images.unsplash.com/photo-1700124708071-4af4867eeaf3?q=80&w=1200&auto=format&fit=crop'
  WHEN image ~ 'photo-1509316975850-' THEN 'https://images.unsplash.com/photo-1506645728556-ac574e628eca?q=80&w=1200&auto=format&fit=crop'
  ELSE image
END
WHERE image ~ 'photo-(1547234935|1451187580459|1469854523086|1555396273|1516450360452|1492684223066|1508700115892|1512453979798|1610878180933|1509316975850)-';

-- 3) Blog covers
UPDATE public.blogs SET featured_image = CASE
  WHEN featured_image ~ 'photo-1509316975850-' THEN 'https://images.unsplash.com/photo-1700124708071-4af4867eeaf3?q=80&w=1200&auto=format&fit=crop'
  WHEN featured_image ~ 'photo-1547234935-'    THEN 'https://images.unsplash.com/photo-1565081189012-7f02978bc81c?q=80&w=1200&auto=format&fit=crop'
  WHEN featured_image ~ 'photo-1512453979798-' THEN 'https://images.unsplash.com/photo-1549944850-84e00be4203b?q=80&w=1200&auto=format&fit=crop'
  WHEN featured_image ~ 'photo-1451187580459-' THEN 'https://images.unsplash.com/photo-1494674557684-c26be0f88950?q=80&w=1200&auto=format&fit=crop'
  ELSE '/images/hero-dune-bashing.webp'
END
WHERE featured_image ~ 'photo-(1509316975850|1547234935|1512453979798|1451187580459|1469854523086|1492684223066|1508700115892|1516450360452|1555396273|1610878180933)-';

-- 4) Gallery page items that use any of them are removed
DELETE FROM public.gallery
WHERE image_url ~ 'photo-(1451187580459|1469854523086|1492684223066|1508700115892|1509316975850|1516450360452|1547234935|1555396273|1610878180933)-';
