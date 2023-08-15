import Image from 'next/image'
import Details from './details'
import { MovieDetails } from '@/types'
import { BACKDROP_URL, POSTER_URL } from '@/lib/urls'

const Tvs = ({ data }: { data: MovieDetails }) => {
	const {
		backdrop_path,
		original_title,
		title,
		poster_path,
		release_date,
		overview,
		genres,
		vote_average,
		runtime,
	} = data

	return (
		<div
			style={{
				backgroundImage: `url(${BACKDROP_URL({
					quality: 'original',
				})}${backdrop_path})`,
			}}
			className={`flex flex-col relative p-8  md:p-16 bg-no-repeat bg-cover bg-fixed bg-center`}>
			<div className='h-full absolute w-full z-0 top-0 right-0 backdrop-blur-sm bg-black/40' />
			<div className='z-10 flex flex-col items-center md:flex-row'>
				<div className='md:h-[560px] h-auto max-h-[560px] max-w-[416px]  w-[100%]  md:w-[416px] rounded-xl border-battleGrey border-[2px] mb-10 md:mb-0 md:mr-10 overflow-hidden'>
					<Image
						src={`${POSTER_URL({ quality: 'original' })}${poster_path}`}
						alt={title ?? original_title}
						width={360}
						height={480}
						className='object-cover h-full w-full'
					/>
				</div>
				<Details
					rate={vote_average}
					name={title ?? original_title}
					overview={overview}
					genres={genres}
					duration={runtime}
				/>
			</div>
		</div>
	)
}

export default Tvs
