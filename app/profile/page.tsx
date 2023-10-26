import { AvatarContainer } from '@/components'
import SubmitButton from '@/components/submitButton'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { updateProfileAction } from '../actions/profile'

const Profile = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const { data } = await supabase
		.from('profiles')
		.select()
		.eq('id', user?.id!)
		.single()

	const { data: avatarPublicUrl } = supabase.storage
		.from('avatars')
		.getPublicUrl(data?.avatar_url!)

	return (
		<div className='p-4 min-h-screen'>
			<AvatarContainer url={avatarPublicUrl.publicUrl} />
			<form className='flex flex-col mt-4' action={updateProfileAction}>
				<label htmlFor='fullname' className='mb-2'>
					Full Name
				</label>
				<input
					name='fullname'
					defaultValue={data?.full_name!}
					className='p-2 rounded-md max-w-sm outline-none mb-4'
					type='text'
					placeholder='Enter your name...'
				/>
				<label htmlFor='username' className='mb-2'>
					Full Name
				</label>
				<input
					name='username'
					defaultValue={data?.username!}
					className='p-2 rounded-md max-w-sm outline-none mb-4'
					type='text'
					placeholder='Enter your user name...'
				/>
				<SubmitButton className='bg-fuelYellow p-2 max-w-sm rounded-md text-white'>
					Submit
				</SubmitButton>
			</form>
		</div>
	)
}

export default Profile
