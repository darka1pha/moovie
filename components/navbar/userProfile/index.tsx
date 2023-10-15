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
						<li className='bg-red-500 text-white rounded-md hover:bg-red-600 transition-all'>
							<form action='/api/auth/sign-out' method='post'>
								<button className='hover:text-white'>Logout</button>
							</form>
						</li>
					</>
				) : (
					<>
						<li>
							<Link href={'/login'}>Login</Link>
						</li>
					</>
				)}
			</ul>
		</div>
	)
}

export default UserProfile
