import { useState } from "react";

const FILTERS = ["Populares", "Complementos", "Extras"];

export default function ServiceFilters() {
  const [active, setActive] = useState("Populares");

  return (
    <div className="inline-flex rounded-full bg-[#FFF5E4] p-1 mb-10">
      {FILTERS.map((filter) => {
        const isActive = active === filter;

        return (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className="relative px-5 py-2 text-sm font-medium text-gray-500 rounded-full transition"
          >
            <span
              className={`
                pointer-events-none absolute inset-0 rounded-full
                bg-[#F8B2BE]/90 blur-lg
                transition-opacity duration-300
                ${isActive ? "opacity-100" : "opacity-0"}
                group-hover:opacity-100
              `}
            />

            <span
              className={`
                relative z-10 rounded-full px-4 py-1
                transition-colors duration-300
                ${isActive ? "bg-[#D4AF37]/5 text-black" : ""}
              `}
            >
              {filter}
            </span>
          </button>
        );
      })}
    </div>
  );
}
