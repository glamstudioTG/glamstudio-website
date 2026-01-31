"use client";

import { useState } from "react";

const FILTERS = ["Populares", "Complementos", "Extras"];

export default function ServiceFilters() {
  const [active, setActive] = useState("Populares");

  return (
    <div
      className="
        mb-6
        w-full
        overflow-x-auto
        no-scrollbar
      "
    >
      <div
        className="
          flex gap-2
          rounded-full
          bg-[#FFF5E4]
          p-1
          w-max
          mx-auto
        "
      >
        {FILTERS.map((filter) => {
          const isActive = active === filter;

          return (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className="
                relative shrink-0
                px-4 py-2
                text-sm font-medium
                rounded-full
                transition
              "
            >
              {/* glow */}
              <span
                className={`
                  pointer-events-none absolute inset-0 rounded-full
                  bg-[#F8B2BE]/90 blur-lg
                  transition-opacity duration-300
                  ${isActive ? "opacity-100" : "opacity-0"}
                `}
              />

              <span
                className={`
                  relative z-10
                  transition-colors duration-300
                  ${isActive ? "text-black" : "text-gray-500"}
                `}
              >
                {filter}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
