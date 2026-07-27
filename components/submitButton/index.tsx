// components/submitButton/index.tsx
"use client";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface Props extends ButtonProps { }

const SubmitButton = ({ className, children, ...props }: Props) => {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			disabled={pending}
			aria-disabled={pending}
			className={cn("relative", className)}
			{...props}
		>
			{pending ? (
				<>
					<Spinner size="sm" aria-hidden="true" />
					<span className="sr-only">Submitting…</span>
				</>
			) : (
				children
			)}
		</Button>
	);
};

export default SubmitButton;