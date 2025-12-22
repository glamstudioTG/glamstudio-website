"use client";

import React from "react";
import { cn } from "@/lib/utils";
import calendarIcon from "@/public/icons/calendarIcon.png";
import Image from "next/image";

export interface CornerAccentButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const CornerAccentButton = React.forwardRef<
  HTMLButtonElement,
  CornerAccentButtonProps
>(({ className, children = "Get Started", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#E0C49C] rounded-md group",
        className
      )}
      {...(props as any)}
    >
      <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#a46306] rounded group-hover:-mr-4 group-hover:-mt-4">
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-[#E5B997]" />
      </span>

      <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#a46306] rounded group-hover:-ml-4 group-hover:-mb-4">
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-[#E5B997]" />
      </span>

      <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#AF804F] rounded-md group-hover:translate-x-0" />

      <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-black">
        <Image
          src={calendarIcon}
          alt="Calendar Icon"
          width={20}
          height={20}
          className="mr-2 mb-1 inline-block"
        />
        {children}
      </span>
    </button>
  );
});

CornerAccentButton.displayName = "CornerAccentButton";
