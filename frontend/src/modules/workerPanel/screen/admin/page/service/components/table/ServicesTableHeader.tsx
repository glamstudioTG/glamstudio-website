"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { ServiceFormModal } from "../actions/serviceFormModal";
import { useCreateService } from "../../../../hooks/services/useCreateService";
import { useCategories } from "../../../../hooks/categories/useGetCategory";

export function ServicesTableHeader() {
  const [openCreate, setOpenCreate] = useState(false);

  const { data: categories = [] } = useCategories();
  const { mutate: createService, isPending } = useCreateService();

  return (
    <>
      <div className="flex items-center justify-between p-6 border-b border-neutral-200">
        <div className="relative w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            placeholder="Buscar servicio..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-200 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#850E35]/20"
          />
        </div>

        <button
          onClick={() => setOpenCreate(true)}
          className="flex items-center gap-2 cursor-pointer bg-[#850E35] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#6d0c2c] transition"
        >
          <Plus size={16} />
          Nuevo Servicio
        </button>
      </div>

      <ServiceFormModal
        open={openCreate}
        title="Nuevo Servicio"
        categories={categories}
        isSubmitting={isPending}
        onClose={() => setOpenCreate(false)}
        onSubmit={(values) => {
          createService({
            categoryId: values.categoryId,
            dto: {
              name: values.name,
              description: values.description,
              price: Number(values.price),
              duration: Number(values.duration),
              image: values.image,
            },
          });
        }}
      />
    </>
  );
}
