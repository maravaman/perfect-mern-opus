import { supabase } from '@/integrations/supabase/client';

export const uploadImage = async (file: File, folder: string = 'general'): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('knight21-uploads')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Upload error:', error);
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('knight21-uploads')
    .getPublicUrl(data.path);

  return publicUrl;
};

export const deleteImage = async (url: string): Promise<void> => {
  const path = url.split('/knight21-uploads/')[1];
  if (!path) return;

  const { error } = await supabase.storage
    .from('knight21-uploads')
    .remove([path]);

  if (error) {
    console.error('Delete error:', error);
    throw error;
  }
};

export const uploadMultipleImages = async (
  files: File[],
  folder: string = 'general'
): Promise<string[]> => {
  const uploadPromises = files.map(file => uploadImage(file, folder));
  return Promise.all(uploadPromises);
};
