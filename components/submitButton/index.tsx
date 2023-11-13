'use client'
import { ButtonHTMLAttributes } from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

const SubmitButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
	const { pending } = useFormStatus()

	return (
		<button className='flex justify-center items-center' disabled={pending} aria-disabled={pending} type='submit' {...props}>
			{pending ? (
				<span className='loading h-full loading-dots loading-sm' />
			) : (
				props.children
			)}
		</button>
	)
}

export default SubmitButton
