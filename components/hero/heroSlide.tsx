'use client'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
	imageUrl: string
	name: string
	overview: string
	adult: boolean
	mediaType: 'tv' | 'movie' | 'person' | undefined
	id: number
}

const HeroSlide = ({
	imageUrl,
	name,
	overview,
	adult,
	mediaType,
	id,
}: Props) => {
	return (
		<div className='h-full w-full'>
			<div className='absolute top-0 right-0 z-10 w-full h-full'>
				<Image
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					fill
					className='object-cover'
					alt={name}
					src={imageUrl}
				/>
			</div>
			<div className='absolute w-full h-full bg-black/40 z-20'>
				<div className='flex flex-col justify-center h-full px-10'>
					<div>
						<p className='text-3xl text-white'>{name}</p>
					</div>
					{adult && (
						<div className='rounded-2xl mt-4 border-[1px] w-12 flex items-center justify-center py-1 border-white]'>
							<p className='text-xs text-white'>+18</p>
						</div>
					)}
					<div className='mt-4 max-w-md'>
						<p className='text-sm leading-7 text-white line-clamp-4'>
							{overview}
						</p>
					</div>
					<div className='mt-4'>
						<Link
							href={mediaType === 'movie' ? `/movies/${id}` : `/shows/${id}`}>
							<button
								aria-label='Watch Now'
								className='bg-fuelYellow text-white text-xs rounded-2xl py-2 px-6'>
								Watch now
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeroSlide
