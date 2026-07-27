import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-battleGrey/40 bg-transparent px-4 py-2 text-sm text-white transition-colors duration-200 placeholder:text-battleGrey/70",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuelYellow focus-visible:border-fuelYellow",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };