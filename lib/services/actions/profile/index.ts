import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export const updateProfileAction = async (formData: FormData) => {
  'use server';

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fullName = formData.get('fullname') as string;
  const username = formData.get('username') as string;

  const { data, error } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      username,
    })
    .eq('id', user?.id!);
  console.log({ Error: error, Data: data });
  revalidatePath('/profile');
};
