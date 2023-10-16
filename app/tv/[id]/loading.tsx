const Loading = () => {
	return (
		<div className={`flex flex-col relative p-8 md:p-16`}>
			<div className='z-10 flex flex-col items-center md:flex-row'>
				<div
					className='md:h-[560px] h-auto max-h-[560px] max-w-[416px] w-[100%] md:w-[416px] rounded-xl 
      mb-10 md:mb-0 md:mr-10 animate-pulse bg-slate-500/80'
				/>

				<div className='flex flex-col flex-1 text-white'>
					<div className='flex justify-between'>
						<h1 className=' text-2xl font-bold animate-pulse bg-slate-500/80'></h1>
					</div>
					<div className='flex flex-wrap mt-5'>
						<div className='flex flex-col px-4 py-2 m-2 h-16 w-32 animate-pulse bg-slate-500/80 rounded-md'></div>
						<div className='flex flex-col px-4 py-2 m-2 h-16 w-32 animate-pulse bg-slate-500/80 rounded-md'></div>
						<div className='flex flex-col px-4 py-2 m-2 h-16 w-32 animate-pulse bg-slate-500/80 rounded-md'></div>
					</div>
					<div className='mt-5 ml-2 animate-pulse bg-slate-500/80 w-full h-64'></div>
				</div>
			</div>
		</div>
	)
}

export default Loading
