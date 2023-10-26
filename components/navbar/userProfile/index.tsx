import { signOutAction } from '@/app/actions/auth/sign-out'
import SubmitButton from '@/components/submitButton'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from 'iconsax-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import Avatar from './avatar'

const UserProfile = async () => {
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
		<div className='dropdown dropdown-end z-20'>
			<Avatar avatar_url={avatarPublicUrl.publicUrl} />
			<ul
				tabIndex={0}
				className='dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-white'>
				{user ? (
					<>
						<li>
							<Link href={'/profile'}>Profile</Link>
						</li>
						<li>
							<Link href={'/favorites'}>Favorites</Link>
						</li>
						<li className='bg-red-500 text-white flex justify-center items-center hover:text-white rounded-md'>
							<form className='w-full h-full flex p-0' action={signOutAction}>
								<SubmitButton className='w-full h-full p-2'>
									Logout
								</SubmitButton>
							</form>
						</li>
					</>
				) : (
					<>
						<li>
							<Link href={'/auth/sign-in'}>Sign in</Link>
						</li>
					</>
				)}
			</ul>
		</div>
	)
}

export default UserProfile
