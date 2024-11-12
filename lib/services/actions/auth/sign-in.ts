import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signInAction(formData: FormData) {
  'use server';
  const supabase = await createClient();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect('/auth/sign-in?error=Could not authenticate user');
  } else {
    redirect('/');
  }
}
