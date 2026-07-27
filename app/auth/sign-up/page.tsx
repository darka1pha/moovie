// app/auth/sign-up/page.tsx
import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Messages from "../messages";
import Link from "next/link";
import { signUpAction } from "@/app/actions/auth/sign-up";

export default function SignUp() {
	return (
		<div className="flex-1 flex flex-col w-full items-center px-8 h-[calc(100vh-80px)] justify-center">
			<form
				className="flex-1 flex flex-col w-full sm:max-w-md justify-center gap-2"
				action={signUpAction}
			>
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					name="email"
					placeholder="you@example.com"
					className="mb-4"
					required
				/>
				<Label htmlFor="password">Password</Label>
				<Input
					id="password"
					type="password"
					name="password"
					placeholder="••••••••"
					required
				/>
				<div className="flex mb-6 mt-4 text-white text-sm">
					<p>Already have an account?</p>&nbsp;
					<Link href="/auth/sign-in" className="text-fuelYellow underline">
						Sign in
					</Link>
				</div>
				<SubmitButton>Sign Up</SubmitButton>
				<Messages />
			</form>
		</div>
	);
}