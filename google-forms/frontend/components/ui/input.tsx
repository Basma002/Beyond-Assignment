import React from "react";
import { cn } from "@/lib/utils"; // Ensure the `cn` utility exists

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
