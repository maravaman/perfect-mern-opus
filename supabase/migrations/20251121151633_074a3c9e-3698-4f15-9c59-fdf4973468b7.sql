-- Add SEO fields to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS meta_title text,
ADD COLUMN IF NOT EXISTS meta_description text;

COMMENT ON COLUMN public.blog_posts.meta_title IS 'SEO meta title for the blog post';
COMMENT ON COLUMN public.blog_posts.meta_description IS 'SEO meta description for the blog post';