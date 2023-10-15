import { Database } from '@/types/supabase'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const addFavorites = async (formData: FormData) => {
	'use server'

	const supabase = createServerActionClient<Database>({ cookies })

	const {
		data: { user },
	} = await supabase.auth.getUser()
	const itemId = formData.get('itemId') as string
	const mediaType = formData.get('mediaType') as string
	const name = formData.get('name') as string
	const rate = formData.get('rate') as string
	const posterUrl = formData.get('posterUrl') as string
	const { error } = await supabase.from('favorites').insert({
		media_type: mediaType,
		item_id: itemId,
		name: name,
		poster_url: posterUrl,
		rate,
		created_at: new Date(Date.now()).toLocaleString(),
		user_id: String(user?.id),
	})

	console.log(error?.details)
}
