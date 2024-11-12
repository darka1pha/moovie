import SubmitButton from "@/components/submitButton";
import Link from "next/link";
import Messages from "../messages";
import { signInAction } from "@/app/actions/auth/sign-in";

export default function SignIn() {
	return (
		<div className="flex-1 flex flex-col w-full items-center px-8 h-[calc(100vh-80px)] justify-center">
			<form
				className="flex-1 flex flex-col w-full sm:max-w-md justify-center gap-2"
				action={signInAction}
			>
				<label className="text-md text-white" htmlFor="email">
					Email
				</label>
				<input
					className="rounded-md px-4 py-2 bg-inherit border mb-4 text-white"
					name="email"
					placeholder="you@example.com"
					required
				/>
				<label className="text-md text-white" htmlFor="password">
					Password
				</label>
				<input
					className="rounded-md px-4 py-2 bg-inherit border text-white"
					type="password"
					name="password"
					placeholder="••••••••"
					required
				/>
				<div className="flex mb-6">
					<p>dont have an account?</p>&nbsp;
					<Link href={"/auth/sign-up"} className="text-fuelYellow underline">
						Sign up
					</Link>
				</div>
				<SubmitButton className="bg-fuelYellow text-white hover:opacity-90 transition-all p-2 rounded-lg">
					Sign In
				</SubmitButton>
				<Messages />
			</form>
		</div>
	);
}
