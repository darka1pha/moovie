import ItemsCard from '@/components/items/itemsCard'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const Favorites = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data } = await supabase.from('favorites').select('*')
	return (
		<div className='min-h-[calc(100vh-80px)] p-5'>
			<h1 className='font-bold text-white text-2xl'>Favorites</h1>
			<div className='flex flex-wrap justify-center'>
				{data?.map(({ id, item_id, media_type, name, rate, poster_url }) => (
					<ItemsCard
						key={id}
						original_title={name ?? ''}
						poster_path={poster_url ?? ''}
						vote_average={Number(rate)}
						id={Number(item_id) ?? 0}
						media={media_type ?? undefined}
					/>
				))}
			</div>
		</div>
	)
}

export default Favorites
