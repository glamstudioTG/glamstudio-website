"use client";

import { Pencil } from "lucide-react";
import type { Service } from "../../../../types/service.types";

interface Props {
  service: Service;
  onEdit: () => void;
}

export function ServiceRow({ service, onEdit }: Props) {
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(service.price);

  return (
    <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition hidden lg:table-row">
      <td className="px-6 py-4">
        <p className="font-medium text-neutral-800">{service.name}</p>
        {service.description && (
          <p className="text-xs text-neutral-500 mt-1">{service.description}</p>
        )}
      </td>

      <td className="px-6 py-4 text-neutral-700">
        {service.category?.name ?? "—"}
      </td>
      <td className="px-6 py-4 text-neutral-700">{formattedPrice}</td>

      <td className="px-6 py-4 text-neutral-700">{service.duration} min</td>

      <td className="px-6 py-4 text-right">
        <button
          onClick={onEdit}
          className="p-2 rounded-md border border-neutral-200 text-[#850E35] cursor-pointer hover:bg-neutral-100 transition"
        >
          <Pencil size={16} />
        </button>
      </td>
    </tr>
  );
}
