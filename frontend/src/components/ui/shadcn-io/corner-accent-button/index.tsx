"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Image from "next/image";

export interface CornerAccentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  accentColor?: string;
}

export const CornerAccentButton = React.forwardRef<
  HTMLButtonElement,
  CornerAccentButtonProps
>(({ className, accentColor, children = "Get Started", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#850e35] rounded-md group",
        className,
      )}
      {...(props as any)}
    >
      <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#ee6983] rounded group-hover:-mr-4 group-hover:-mt-4">
        <span
          className={cn(
            "absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 transition-colors duration-300",
            accentColor ?? "bg-[#ed889c]",
          )}
        />
      </span>

      <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#ee6983] rounded group-hover:-ml-4 group-hover:-mb-4">
        <span
          className={cn(
            "absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 transition-colors duration-300",
            accentColor ?? "bg-[#ed889c]",
          )}
        />
      </span>

      <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#ee6983] rounded-md group-hover:translate-x-0" />

      <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
        <Calendar className="mr-2 mb-1 inline-block text-white" />
        {children}
      </span>
    </button>
  );
});

CornerAccentButton.displayName = "CornerAccentButton";
