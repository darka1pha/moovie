import { Database } from '@/types/supabase'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signOutAction = async (formData: FormData) => {
	'use server'
	const supabase = createServerActionClient<Database>({ cookies })
  await supabase.auth.signOut()

  redirect('/')
}
