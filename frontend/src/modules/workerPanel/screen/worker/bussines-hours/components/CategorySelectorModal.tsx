"use client";

import { useState } from "react";
import { useCategories } from "../../../admin/hooks/categories/useGetCategory";
interface Props {
  onClose: () => void;
  onSelect: (ids: string[]) => void;
  selected: string[];
}

export function CategorySelectorModal({ onClose, onSelect, selected }: Props) {
  const { data: categories = [] } = useCategories();
  const [localSelected, setLocalSelected] = useState<string[]>(selected);

  const toggle = (id: string) => {
    setLocalSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const handleSave = () => {
    onSelect(localSelected);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-60">
      <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-6">
        <h4 className="font-semibold text-neutral-800">
          Seleccionar habilidades
        </h4>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {categories.map((cat: any) => (
            <div
              key={cat.id}
              onClick={() => toggle(cat.id)}
              className={`p-2 rounded-md text-sm cursor-pointer ${
                localSelected.includes(cat.id)
                  ? "bg-[#850E35] text-white border-[#850E35]"
                  : "hover:bg-neutral-100 text-black"
              }`}
            >
              {cat.name}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-sm px-3 py-1 text-black cursor-pointer rounded-md"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="text-sm px-4 py-1 bg-[#850E35] cursor-pointer text-white rounded-md"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
