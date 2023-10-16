'use client'
import { Heart, Star1 } from 'iconsax-react'
import DetailItem from './detailItem'
import { favoritesAction } from '@/app/actions/favorites'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { experimental_useFormStatus as useFromStatus } from 'react-dom'
import { useState, useEffect } from 'react'

interface Props {
	name: string
	overview: string
	genres: { name: string }[]
	rate: number
	duration: number
	mediaType: 'movie' | 'tv'
	id: string
	posterUrl: string | null
}

const getLikeDetails = async (id: string) => {
	const supabase = createClientComponentClient<Database>()
	const { data } = await supabase
		.from('favorites')
		.select('*')
		.eq('item_id', id)
		.single()

	return data
}

const Details = ({
	posterUrl,
	name,
	overview,
	genres,
	rate,
	duration,
	mediaType,
	id,
}: Props) => {
	const formStatus = useFromStatus()
	const [isLiked, setIsLiked] = useState(false)

	useEffect(() => {
		getLikeDetails(id).then((data) => {
			setIsLiked(!!data)
		})
	}, [])

	return (
		<div className='flex flex-col flex-1 text-white'>
			<div className='flex justify-between'>
				<h1 className=' text-2xl font-bold'>{name}</h1>
				<form action={favoritesAction} method='post'>
					<input type='hidden' name='name' value={name} />
					<input type='hidden' name='rate' value={rate} />
					<input type='hidden' name='itemId' value={id} />
					<input type='hidden' name='mediaType' value={mediaType} />
					<input type='hidden' name='posterUrl' value={posterUrl || ''} />
					<input
						type='hidden'
						name='liked'
						value={isLiked ? 'liked' : 'not-liked'}
					/>
					<button className='btn rounded-full h-14 w-14'>
						{formStatus.pending ? (
							<span className='loading loading-ring loading-sm' />
						) : (
							<Heart
								variant={isLiked ? 'Bold' : 'Outline'}
								size={26}
								className='text-fuelYellow'
							/>
						)}
					</button>
				</form>
			</div>
			<div className='flex flex-wrap mt-5'>
				<DetailItem name={'Rate'}>
					<div className='flex items-center'>
						<Star1 className='text-fuelYellow' size={18} />
						<p className='text-white text-sm ml-2'>{rate.toFixed(1)}</p>
					</div>
				</DetailItem>
				<DetailItem name={'Duration'}>
					<p className=' text-sm ml-2'>{`${duration} Minutes`}</p>
				</DetailItem>
				<DetailItem name={'Genres'}>
					<p className=' text-sm ml-2'>
						{genres.map(({ name }) => name).join(', ')}
					</p>
				</DetailItem>
			</div>
			<div className='mt-5 ml-2'>
				<p className='leading-7'>{overview}</p>
			</div>
		</div>
	)
}

export default Details
