import { Heart, Star1 } from 'iconsax-react'
import DetailItem from './detailItem'
import { addFavorites } from '@/app/actions/favorites'

interface Props {
	name: string
	overview: string
	genres: { name: string }[]
	rate: number
	duration: number
	mediaType: 'movie' | 'tv'
	id: string
}

const Details = ({
	name,
	overview,
	genres,
	rate,
	duration,
	mediaType,
	id,
}: Props) => {
	return (
		<div className='flex flex-col flex-1 text-white'>
			<div className='flex justify-between'>
				<h1 className=' text-2xl font-bold'>{name}</h1>
				<form action={addFavorites} method='post'>
					<input type='hidden' name='name' value={name} />
					<input type='hidden' name='rate' value={rate} />
					<input type='hidden' name='itemId' value={id} />
					<input type='hidden' name='mediaType' value={mediaType} />
					<button className='btn rounded-full h-14 w-14'>
						<Heart size={26} className='text-fuelYellow' />
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
