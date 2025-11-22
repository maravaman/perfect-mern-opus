/*
  # Setup Storage Buckets
  
  ## Overview
  Creates storage buckets for file uploads with proper policies
  
  ## Buckets Created
  - knight21-uploads: Main bucket for all uploads (logos, images, documents)
  
  ## Security
  - Public read access for all files
  - Admin-only write access
*/

-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('knight21-uploads', 'knight21-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view uploads" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;

-- Storage policies
CREATE POLICY "Anyone can view uploads"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'knight21-uploads');

CREATE POLICY "Authenticated users can upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'knight21-uploads' AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Admins can update files"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'knight21-uploads' AND 
    (public.is_admin(auth.uid()) OR auth.uid()::text = (storage.foldername(name))[1])
  );

CREATE POLICY "Admins can delete files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'knight21-uploads' AND 
    (public.is_admin(auth.uid()) OR auth.uid()::text = (storage.foldername(name))[1])
  );
