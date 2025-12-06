-- Make the knight21-uploads bucket private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'knight21-uploads';

-- Drop existing policies on storage.objects for this bucket if they exist
DROP POLICY IF EXISTS "Public read access for knight21-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view uploads" ON storage.objects;
DROP POLICY IF EXISTS "Admins can access knight21-uploads" ON storage.objects;

-- Allow anyone to upload files (needed for career applications)
CREATE POLICY "Anyone can upload to knight21-uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'knight21-uploads');

-- Only admins can view/download files
CREATE POLICY "Admins can view knight21-uploads files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'knight21-uploads' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Only admins can update files
CREATE POLICY "Admins can update knight21-uploads files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'knight21-uploads' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Only admins can delete files
CREATE POLICY "Admins can delete knight21-uploads files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'knight21-uploads' 
  AND public.has_role(auth.uid(), 'admin')
);