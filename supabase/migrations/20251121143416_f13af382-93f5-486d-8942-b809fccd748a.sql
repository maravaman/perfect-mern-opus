-- Add image_url column to blog_posts table
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add excerpt column for blog summaries
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt TEXT;