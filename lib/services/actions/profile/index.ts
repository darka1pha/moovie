import { Database } from '@/types/supabase'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const updateProfileAction = async (formData: FormData) => {
	'use server'

	const supabase = createServerActionClient<Database>({ cookies })

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const fullName = formData.get('fullname') as string
	const username = formData.get('username') as string

	const { data, error } = await supabase
		.from('profiles')
		.update({
			full_name: fullName,
			username,
		})
		.eq('id', user?.id!)

	revalidatePath('/profile')
}
