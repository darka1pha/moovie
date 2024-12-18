import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signUpAction(formData: FormData) {
  'use server';
  const supabase = await createClient();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect('/auth/sign-up?error=Could not authenticate user');
  }
  revalidatePath('/', 'layout');
  redirect('/profile');
}
