import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signOutAction(formData: FormData) {
  'use server';
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect('/');
}
