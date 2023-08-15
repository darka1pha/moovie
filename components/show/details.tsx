import { Star1 } from 'iconsax-react'
import DetailItem from './detailItem'

interface Props {
	name: string
	overview: string
	genres: { name: string }[]
	rate: number
	duration: number
}

const Details = ({
	name,
	overview,
	genres,
	rate,
	duration,
}: Props) => {
	return (
		<div className='flex flex-col flex-1 text-white'>
			<h1 className=' text-2xl font-bold'>{name}</h1>
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
				<p>{overview}</p>
			</div>
		</div>
	)
}

export default Details
