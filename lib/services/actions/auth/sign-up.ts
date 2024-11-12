import { Database } from '@/types/supabase';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signUpAction(formData: FormData) {
  'use server';
  const supabase = createServerActionClient<Database>({ cookies });
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
