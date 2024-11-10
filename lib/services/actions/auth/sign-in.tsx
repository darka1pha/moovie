import { Database } from '@/types/supabase'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signInAction = async (formData: FormData) => {
	'use server'
	const supabase = createServerActionClient<Database>({ cookies })
	const email = String(formData.get('email'))
	const password = String(formData.get('password'))

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		redirect('/auth/sign-in?error=Could not authenticate user')
	} else {
		redirect('/')
	}
}
