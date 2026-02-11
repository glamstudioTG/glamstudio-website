"use client";

import { useState } from "react";
import { ServicesTableHeader } from "./ServicesTableHeader";
import { ServiceRow } from "./ServiceRow";
import { ServiceFormModal } from "../actions/serviceFormModal";

import type { Service } from "../../../../types/service.types";
import { useUpdateService } from "../../../../hooks/services/useUpdateService";
import { useDeleteService } from "../../../../hooks/services/useDeleteService";
import { useCategories } from "../../../../hooks/categories/useGetCategory";

interface Props {
  services: Service[];
}

export function ServicesTable({ services }: Props) {
  const [editingService, setEditingService] = useState<Service | null>(null);

  const { data: categories = [] } = useCategories();

  const { mutate: updateService, isPending: isUpdating } = useUpdateService();

  const { mutate: deleteService, isPending: isDeleting } = useDeleteService();

  return (
    <div className="h-full flex flex-col">
      <ServicesTableHeader />

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f7e3e6] text-neutral-700 text-xs uppercase">
            <tr>
              <th className="text-left px-6 py-3">Nombre del Servicio</th>
              <th className="text-left px-6 py-3">Categoría</th>
              <th className="text-left px-6 py-3">Precio</th>
              <th className="text-left px-6 py-3">Duración</th>
              <th className="text-right px-6 py-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <ServiceRow
                key={service.id}
                service={service}
                onEdit={() => setEditingService(service)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 MODAL FUERA DEL TABLE */}
      {editingService && (
        <ServiceFormModal
          open={true}
          title="Editar Servicio"
          categories={categories}
          initialValues={{
            name: editingService.name,
            categoryId: editingService.categoryId,
            price: String(editingService.price),
            duration: String(editingService.duration),
            description: editingService.description,
            image: editingService.image,
          }}
          onClose={() => setEditingService(null)}
          onSubmit={(values) => {
            updateService(
              {
                id: editingService.id,
                dto: {
                  name: values.name,
                  categoryId: values.categoryId,
                  description: values.description,
                  price: Number(values.price),
                  duration: Number(values.duration),
                  image: values.image,
                },
              },
              {
                onSuccess: () => setEditingService(null),
              },
            );
          }}
          onDelete={() => {
            deleteService(editingService.id, {
              onSuccess: () => setEditingService(null),
            });
          }}
          isSubmitting={isUpdating}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
