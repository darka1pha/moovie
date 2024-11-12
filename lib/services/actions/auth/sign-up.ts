import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signUpAction(formData: FormData) {
  'use server';
  const supabase = await createClient();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `https://moovie-nine.vercel.app/api/auth/callback`,
    },
  });

  if (error) {
    redirect('/auth/sign-up?error=Could not authenticate user');
  } else {
    redirect('/auth/sign-up?message=Check email to continue sign in process');
  }
}
