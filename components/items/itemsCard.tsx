import { POSTER_URL } from '@/lib/urls'
import { Star1 } from 'iconsax-react'
import Image from 'next/image'

interface Props {
	poster_path: string
	original_title: string
	vote_average: number
	media_type: 'tv' | 'movie' | 'person'
	id: number
}

const ItemsCard = ({
	poster_path,
	original_title,
	vote_average,
	media_type,
}: Props) => {
	return (
		<div className='w-64 h-96 bg-fuelYellow m-5 group cursor-pointer rounded-2xl overflow-hidden relative'>
			<Image
				quality={100}
				height={384}
				width={256}
				className='object-cover h-full w-full'
				src={POSTER_URL({ quality: 'original' }) + poster_path}
				alt={original_title}
			/>
			<div className='absolute p-3 backdrop-blur-sm bg-black/50 -bottom-full right-0 h-fit w-full transition-all ease-in-out group-hover:bottom-0 duration-500'>
				<p className='text-white text-sm'>{original_title}</p>
				<div className='flex mt-2'>
					<div className='bg-fuelYellow p-2 mr-2 w-fit rounded-xl flex items-center text-xs text-white text-center justify-center'>
						<Star1 size={15} className='mr-1' />
						<p>{vote_average?.toFixed(1)}</p>
					</div>
					<div className='bg-fuelYellow p-2 w-fit rounded-xl flex items-center text-xs text-white text-center justify-center'>
						<p>{media_type}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ItemsCard
