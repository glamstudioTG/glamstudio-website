"use client";

import { useState } from "react";

type InputProps = {
  label: string;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
};

export default function Input({
  label,
  placeholder = "",
  type = "text",
  icon,
}: InputProps) {
  const [value, setValue] = useState("");
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#716D6D]">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C2A85D]">
            {icon}
          </span>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(o) => setValue(o.target.value)}
          className={`w-full rounded-lg border text-black bg-[#F0DDC1] border-[#FDE68A] p-3 
            focus:outline-none focus:ring-2 focus:ring-[#D4AF37]
            ${icon ? "pl-10" : ""}
            placeholder:text-[#9E9B91]
          `}
        />
      </div>
    </div>
  );
}
