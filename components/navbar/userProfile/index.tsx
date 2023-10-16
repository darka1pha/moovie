import { signOutAction } from '@/app/actions/auth/sign-out'
import SubmitButton from '@/components/submitButton'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from 'iconsax-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

const UserProfile = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const {
		data: { user },
	} = await supabase.auth.getUser()
	return (
		<div className='dropdown dropdown-end z-20'>
			<label tabIndex={0} className='btn m-1 rounded-full'>
				<User className='text-fuelYellow' size={24} />
			</label>
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
								<SubmitButton className='w-full h-full p-2'>Logout</SubmitButton>
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
