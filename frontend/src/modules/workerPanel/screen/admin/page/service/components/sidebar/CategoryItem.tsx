"use client";

import clsx from "clsx";
import { Trash2 } from "lucide-react";

interface CategoryItemProps {
  id?: string;
  name: string;
  count?: number;
  active?: boolean;
  showDelete?: boolean;
  onClick?: () => void;
  onDelete?: (id: string) => void;
}

export function CategoryItem({
  id,
  name,
  count,
  active = false,
  showDelete = false,
  onClick,
  onDelete,
}: CategoryItemProps) {
  return (
    <div className="relative group">
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

      {showDelete && id && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(id);
          }}
          className="absolute -top-2.5 -right-1.5 opacity-0 cursor-pointer group-hover:opacity-100 transition bg-white shadow-md p-1 rounded-md text-red-600 hover:bg-red-50"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
