import React from 'react'

const DetailItem = ({
	children,
	name,
}: {
	name: string
	children: React.ReactNode
}) => {
	return (
		<div className='flex flex-col w-fit px-4 py-2 m-2 justify-center items-center border-fuelYellow border-[2px] rounded-md'>
			<p className='mb-2'>{name}</p>
			<div>{children}</div>
		</div>
	)
}

export default DetailItem
