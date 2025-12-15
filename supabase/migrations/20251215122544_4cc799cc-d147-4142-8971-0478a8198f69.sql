-- Add sub_category column to portfolio_items table
ALTER TABLE public.portfolio_items 
ADD COLUMN IF NOT EXISTS sub_category text;