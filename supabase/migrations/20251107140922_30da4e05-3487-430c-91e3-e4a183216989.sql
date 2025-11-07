-- Add image_url column to packages table for pricing plan images
ALTER TABLE public.packages ADD COLUMN IF NOT EXISTS image_url TEXT;