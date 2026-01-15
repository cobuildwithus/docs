"use client";

import { forwardRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-neutral-200 text-black hover:bg-neutral-300",
      outline:
        "border border-neutral-700 bg-transparent text-neutral-400 hover:border-neutral-500 hover:text-neutral-200",
      ghost: "bg-transparent text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200",
    };

    const sizes = {
      default: "h-9 px-4 py-2 text-sm",
      sm: "h-8 px-3 py-1.5 text-xs",
      lg: "h-10 px-6 py-2.5 text-sm",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
