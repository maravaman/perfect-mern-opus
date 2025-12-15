-- Add image_url column to offers_banner for banner images
ALTER TABLE public.offers_banner 
ADD COLUMN IF NOT EXISTS image_url text;