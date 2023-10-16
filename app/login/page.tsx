import SubmitButton from '@/components/submitButton'
import Messages from './messages'

export default function Login() {
	return (
		<div className='flex-1 flex flex-col w-full items-center px-8 h-[calc(100vh-80px)] justify-center'>
			<form
				className='flex-1 flex flex-col w-full sm:max-w-md justify-center gap-2'
				action='/api/auth/sign-in'
				method='post'>
				<label className='text-md text-white' htmlFor='email'>
					Email
				</label>
				<input
					className='rounded-md px-4 py-2 bg-inherit border mb-4 text-white'
					name='email'
					placeholder='you@example.com'
					required
				/>
				<label className='text-md text-white' htmlFor='password'>
					Password
				</label>
				<input
					className='rounded-md px-4 py-2 bg-inherit border mb-6 text-white'
					type='password'
					name='password'
					placeholder='••••••••'
					required
				/>
				<SubmitButton
					className='bg-fuelYellow text-white hover:opacity-90 transition-all p-2 rounded-lg'>
					Sign In
				</SubmitButton>
				<SubmitButton
					className='bg-transparent hover:opacity-90 transition-all text-white border-[1px] border-fuelYellow p-2 rounded-lg'
					formAction='/api/auth/sign-up'>
					Sign Up
				</SubmitButton>
				<Messages />
			</form>
		</div>
	)
}
