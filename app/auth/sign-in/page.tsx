import { Suspense } from "react";
import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Messages from "../messages";
import { signInAction } from "@/app/actions/auth/sign-in";

export default function SignIn() {
	return (
		<div className="flex-1 flex flex-col w-full items-center px-4 min-h-[calc(100vh-80px)] justify-center py-12">
			<div className="w-full max-w-md bg-balasticSea/60 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
				<div className="text-center mb-6">
					<h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
					<p className="text-battleGrey text-sm mt-1">Sign in to your Moovie account to access favorites</p>
				</div>
				<form className="flex flex-col gap-3" action={signInAction}>
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
							autoComplete="current-password"
							placeholder="••••••••"
							required
						/>
					</div>
					<div className="flex justify-between items-center my-2 text-sm text-neutral-300">
						<span>Don&apos;t have an account?</span>
						<Link href="/auth/sign-up" className="text-fuelYellow hover:underline font-medium">
							Sign up
						</Link>
					</div>
					<SubmitButton className="w-full mt-2 h-11 text-base font-semibold">Sign In</SubmitButton>
					<Suspense fallback={null}>
						<Messages />
					</Suspense>
				</form>
			</div>
		</div>
	);
}