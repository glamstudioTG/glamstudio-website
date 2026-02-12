"use client";

import { Plus, Trash2 } from "lucide-react";
import { CategoryItem } from "./CategoryItem";
import { CategoryFormModal } from "../actions/CategoryFormModal";
import { useState } from "react";
import { useCreateCategory } from "../../../../hooks/categories/useCreateCategory";
import { useDeleteCategory } from "../../../../hooks/categories/useDeleteCategory";

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
  const [open, setOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const { mutate: createCategory, isPending } = useCreateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const totalCount = services.length;

  return (
    <>
      <aside
        className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm 
        flex flex-col
        lg:h-full"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-neutral-800">Categorías</h3>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDeleteMode((prev) => !prev)}
              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border cursor-pointer transition ${
                deleteMode
                  ? "bg-red-50 border-red-300 text-red-600 "
                  : "border-neutral-200 text-black hover:bg-neutral-100"
              }`}
            >
              <Trash2 size={14} />
            </button>

            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-1 text-xs cursor-pointer px-3 py-1.5 rounded-md border border-neutral-200 text-black hover:bg-neutral-100 transition"
            >
              <Plus size={14} />
              Nueva
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 max-h-60 lg:max-h-none">
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
                id={category.id}
                name={category.name}
                count={count}
                active={selectedCategoryId === category.id}
                showDelete={deleteMode}
                onClick={() => onSelectCategory(category.id)}
                onDelete={(id) => {
                  if (count > 0) {
                    alert(
                      "No puedes eliminar una categoría que tiene servicios asociados.",
                    );
                    return;
                  }

                  deleteCategory(id);
                }}
              />
            );
          })}
        </div>
      </aside>

      <CategoryFormModal
        open={open}
        onClose={() => setOpen(false)}
        isLoading={isPending}
        onSubmit={(values) => {
          createCategory(values, {
            onSuccess: () => setOpen(false),
          });
        }}
      />
    </>
  );
}
