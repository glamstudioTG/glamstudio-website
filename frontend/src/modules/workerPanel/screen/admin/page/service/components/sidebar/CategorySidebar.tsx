"use client";

import { Plus } from "lucide-react";
import { CategoryItem } from "./CategoryItem";

interface Category {
  id: string;
  name: string;
}

interface Service {
  id: string;
  categoryId: string;
}

interface Props {
  categories: Category[];
  services: Service[];
  selectedCategoryId?: string;
  onSelectCategory: (id?: string) => void;
}

export function CategorySidebar({
  categories,
  services,
  selectedCategoryId,
  onSelectCategory,
}: Props) {
  const totalCount = services.length;

  return (
    <aside className="h-full bg-white border border-neutral-200 rounded-xl p-4 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-neutral-800">Categorías</h3>

        <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-neutral-200 text-black hover:bg-neutral-100 transition">
          <Plus size={14} />
          Nueva
        </button>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
        <CategoryItem
          name="Todos los Servicios"
          count={totalCount}
          active={!selectedCategoryId}
          onClick={() => onSelectCategory(undefined)}
        />

        {categories.map((category) => {
          const count = services.filter(
            (s) => s.categoryId === category.id,
          ).length;

          return (
            <CategoryItem
              key={category.id}
              name={category.name}
              count={count}
              active={selectedCategoryId === category.id}
              onClick={() => onSelectCategory(category.id)}
            />
          );
        })}
      </div>
    </aside>
  );
}
