"use client";

import clsx from "clsx";

interface CategoryItemProps {
  name: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryItem({
  name,
  count,
  active = false,
  onClick,
}: CategoryItemProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm transition-all cursor-pointer",
        active
          ? "bg-[#f4cdd3] text-[#850E35] font-medium"
          : "hover:bg-neutral-100 text-neutral-700",
      )}
    >
      <span>{name}</span>

      {typeof count === "number" && (
        <span
          className={clsx(
            "text-xs px-2 py-0.5 rounded-full",
            active
              ? "bg-white text-[#850E35]"
              : "bg-neutral-200 text-neutral-600",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
