"use client";

import { ServiceFilter } from "./types";

interface Category {
  id: string;
  name: string;
}

interface Props {
  value: ServiceFilter;
  categories: Category[];
  onChange: (filter: ServiceFilter) => void;
}

export default function ServiceFilters({ value, categories, onChange }: Props) {
  const isActive = (filter: ServiceFilter) =>
    JSON.stringify(filter) === JSON.stringify(value);

  return (
    <div className="mb-6 w-full overflow-x-auto no-scrollbar">
      <div className="flex gap-2 rounded-full bg-[#FFF5E4] p-1 w-max mx-auto">
        <FilterButton
          active={isActive({ type: "featured" })}
          label="Populares"
          onClick={() => onChange({ type: "featured" })}
        />
        <FilterButton
          active={isActive({ type: "all" })}
          label="Todos"
          onClick={() => onChange({ type: "all" })}
        />

        {categories.map((cat) => (
          <FilterButton
            key={cat.id}
            active={value.type === "category" && value.categoryId === cat.id}
            label={cat.name}
            onClick={() => onChange({ type: "category", categoryId: cat.id })}
          />
        ))}
      </div>
    </div>
  );
}

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterButton({ label, active, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative shrink-0 px-4 py-2 text-sm font-medium rounded-full transition cursor-pointer"
    >
      <span
        className={`
          pointer-events-none absolute inset-0 rounded-full
          bg-[#F8B2BE]/90 blur-lg
          transition-opacity duration-300
          ${active ? "opacity-100" : "opacity-0"}
        `}
      />

      <span
        className={`
          relative z-10 transition-colors duration-300
          ${active ? "text-black" : "text-gray-500"}
        `}
      >
        {label}
      </span>
    </button>
  );
}
