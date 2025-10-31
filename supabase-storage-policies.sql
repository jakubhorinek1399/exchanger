-- ============================================
-- STORAGE BUCKET POLICIES FOR "shares" BUCKET
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================

-- Allow anyone to upload files to the shares bucket
CREATE POLICY "Allow public uploads to shares bucket"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'shares');

-- Allow anyone to read files from the shares bucket (for downloads)
CREATE POLICY "Allow public reads from shares bucket"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'shares');

-- Allow deletion of files (for cleanup/expiration)
CREATE POLICY "Allow public deletes from shares bucket"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'shares');

-- Allow updates to files (if needed for metadata)
CREATE POLICY "Allow public updates to shares bucket"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'shares')
WITH CHECK (bucket_id = 'shares');
