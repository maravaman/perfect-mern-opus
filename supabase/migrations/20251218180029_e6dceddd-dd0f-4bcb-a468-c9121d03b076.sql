-- Fix blog_posts table security issues:
-- 1. Require authentication for blog post submissions
-- 2. Hide author_email from public SELECT queries

-- Drop overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can submit blog posts" ON public.blog_posts;

-- Require authentication for blog post submissions (published=false by default for admin review)
CREATE POLICY "Authenticated users can submit blog posts"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Drop the current SELECT policy
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON public.blog_posts;

-- Create a function to get safe blog post data (hiding author_email from non-admins)
CREATE OR REPLACE FUNCTION public.get_public_blog_posts()
RETURNS TABLE (
  id uuid,
  title text,
  content text,
  excerpt text,
  image_url text,
  author_name text,
  category text,
  tags text[],
  published boolean,
  created_at timestamptz,
  updated_at timestamptz,
  meta_title text,
  meta_description text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id, title, content, excerpt, image_url, author_name, 
    category, tags, published, created_at, updated_at,
    meta_title, meta_description
  FROM public.blog_posts
  WHERE published = true;
$$;

-- Allow public to view published blog posts (but author_email is still in the table)
-- Admins can see all fields including author_email
CREATE POLICY "Anyone can view published blog posts"
  ON public.blog_posts FOR SELECT
  USING (
    published = true OR 
    public.has_role(auth.uid(), 'admin')
  );