import Image from 'next/image'
import Details from './details'
import { MovieDetails, TvDetails } from '@/types'
import { BACKDROP_URL, POSTER_URL } from '@/lib/urls'

const Show = ({ data }: { data: TvDetails }) => {
	const {
		backdrop_path,
		original_name,
		poster_path,
		overview,
		genres,
		vote_average,
		episode_run_time,
	} = data

	return (
		<div className={`flex flex-col relative p-8 md:p-16`}>
			<div
				className='bg-no-repeat bg-cover bg-fixed bg-center will-change-transform absolute top-0 left-0 h-full w-full'
				style={{
					backgroundImage: `url(${BACKDROP_URL({
						quality: 'w780',
					})}${backdrop_path})`,
				}}
			/>
			<div className='h-full absolute w-full z-0 top-0 right-0 backdrop-blur-sm bg-black/40' />
			<div className='z-10 flex flex-col items-center md:flex-row'>
				<div className='md:h-[560px] h-auto max-h-[560px] max-w-[416px]  w-[100%]  md:w-[416px] rounded-xl border-battleGrey border-[2px] mb-10 md:mb-0 md:mr-10 overflow-hidden'>
					<Image
						src={`${POSTER_URL({ quality: 'original' })}${poster_path}`}
						alt={original_name}
						width={360}
						height={480}
						className='object-cover h-full w-full'
					/>
				</div>
				<Details
					rate={vote_average}
					name={original_name}
					overview={overview}
					genres={genres}
					duration={episode_run_time[0]}
				/>
			</div>
		</div>
	)
}

export default Show
