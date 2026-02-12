"use client";

import { useState } from "react";
import { ServicesTableHeader } from "./ServicesTableHeader";
import { ServiceRow } from "./ServiceRow";
import { ServiceFormModal } from "../actions/serviceFormModal";

import type { Service } from "../../../../types/service.types";
import { useUpdateService } from "../../../../hooks/services/useUpdateService";
import { useDeleteService } from "../../../../hooks/services/useDeleteService";
import { useCategories } from "../../../../hooks/categories/useGetCategory";
import { Pencil } from "lucide-react";

interface Props {
  services: Service[];
  onSearchChange: (value: string) => void;
}

export function ServicesTable({ services, onSearchChange }: Props) {
  const [editingService, setEditingService] = useState<Service | null>(null);

  const { data: categories = [] } = useCategories();
  const { mutate: updateService, isPending: isUpdating } = useUpdateService();
  const { mutate: deleteService, isPending: isDeleting } = useDeleteService();

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* HEADER */}
      <ServicesTableHeader onSearchChange={onSearchChange} />

      {/* CONTENT */}
      <div className="flex-1 min-h-0">
        {/* DESKTOP TABLE */}
        <div className="hidden lg:flex flex-col h-full min-h-0">
          {/* Scroll interno aquí */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f7e3e6] text-neutral-700 text-xs uppercase sticky top-0 z-10">
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
        </div>

        {/* MOBILE CARDS */}
        <div className="lg:hidden space-y-4 p-4">
          {services.map((service) => {
            const formattedPrice = new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            }).format(service.price);

            return (
              <div
                key={service.id}
                className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-neutral-800">
                      {service.name}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {service.category?.name ?? "Sin categoría"}
                    </p>
                  </div>

                  <button
                    onClick={() => setEditingService(service)}
                    className="p-2 rounded-md border border-neutral-200 text-[#850E35]"
                  >
                    <Pencil size={16} />
                  </button>
                </div>

                <div className="mt-3 flex justify-between text-sm text-neutral-700">
                  <span>{formattedPrice}</span>
                  <span>{service.duration} min</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      {editingService && (
        <ServiceFormModal
          open
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
          onDelete={() =>
            deleteService(editingService.id, {
              onSuccess: () => setEditingService(null),
            })
          }
          isSubmitting={isUpdating}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
