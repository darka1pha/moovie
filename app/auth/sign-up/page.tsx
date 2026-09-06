import { Suspense } from "react";
import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Messages from "../messages";
import Link from "next/link";
import { signUpAction } from "@/app/actions/auth/sign-up";

export default function SignUp() {
	return (
		<div className="flex-1 flex flex-col w-full items-center px-4 min-h-[calc(100vh-80px)] justify-center py-12">
			<div className="w-full max-w-md bg-balasticSea/60 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
				<div className="text-center mb-6">
					<h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Create an Account</h1>
					<p className="text-battleGrey text-sm mt-1">Join Moovie to track and favorite movies and TV series</p>
				</div>
				<form className="flex flex-col gap-3" action={signUpAction}>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							placeholder="you@example.com"
							required
						/>
					</div>
					<div className="flex flex-col gap-1.5 mt-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							name="password"
							autoComplete="new-password"
							placeholder="••••••••"
							required
						/>
					</div>
					<div className="flex justify-between items-center my-2 text-sm text-neutral-300">
						<span>Already have an account?</span>
						<Link href="/auth/sign-in" className="text-fuelYellow hover:underline font-medium">
							Sign in
						</Link>
					</div>
					<SubmitButton className="w-full mt-2 h-11 text-base font-semibold">Sign Up</SubmitButton>
					<Suspense fallback={null}>
						<Messages />
					</Suspense>
				</form>
			</div>
		</div>
	);
}