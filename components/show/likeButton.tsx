'use client'
import { Heart } from 'iconsax-react'
import { experimental_useFormStatus as useFromStatus } from 'react-dom'

const LikeButton = ({
	data,
}: {
	data: {
		created_at: string
		id: number
		item_id: string | null
		media_type: string | null
		name: string | null
		poster_url: string | null
		rate: string | null
		user_id: string | null
	} | null
}) => {
	const { pending } = useFromStatus()
	return (
		<button className='btn rounded-full h-14 w-14'>
			{pending ? (
				<span className='loading loading-ring loading-sm' />
			) : (
				<Heart
					variant={data ? 'Bold' : 'Outline'}
					size={26}
					className='text-fuelYellow'
				/>
			)}
		</button>
	)
}

export default LikeButton
