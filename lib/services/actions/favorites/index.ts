import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export const favoritesAction = async (formData: FormData) => {
  'use server';

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const itemId = formData.get('itemId') as string;
  const mediaType = formData.get('mediaType') as string;
  const name = formData.get('name') as string;
  const rate = formData.get('rate') as string;
  const posterUrl = formData.get('posterUrl') as string;
  const liked = formData.get('liked') as string;
  if (liked !== 'liked') {
    const { error } = await supabase.from('favorites').insert({
      media_type: mediaType,
      item_id: itemId,
      name: name,
      poster_url: posterUrl,
      rate,
      created_at: new Date(Date.now()).toLocaleString(),
      user_id: String(user?.id),
    });
  } else {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('item_id', itemId);
  }
  revalidatePath(`${mediaType}/${itemId}`);
};
