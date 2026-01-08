"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/src/components/ui/shadcn-io/dialog/dialog";
import { BookingService } from "../../../types/booking.types";

const MOCK_SERVICES: BookingService[] = [
  {
    id: "3",
    name: "Diseño de cejas",
    description: "Perfilado profesional",
    price: 50000,
    duration: 30,
  },
  {
    id: "4",
    name: "Tinte de cejas",
    description: "Color uniforme",
    price: 60000,
    duration: 25,
  },
  {
    id: "5",
    name: "Lifting de pestañas",
    description: "Curvatura natural",
    price: 120000,
    duration: 60,
  },
];

interface Props {
  onSelect: (service: BookingService) => void;
  selectedIds: string[];
}

export default function AddServiceDialog({ onSelect, selectedIds }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const suggestions = useMemo(() => {
    if (!query) return MOCK_SERVICES.slice(0, 3);
    return MOCK_SERVICES.filter((s) =>
      s.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3);
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* SOLO abre el modal */}
      <DialogTrigger asChild>
        <button className="rounded-full border border-[#D4A64E] px-4 py-2 text-sm text-black">
          + Añadir más servicios
        </button>
      </DialogTrigger>

      <DialogContent
        className="
          max-w-xl
          rounded-2xl
          bg-black/5
          text-black
          backdrop-blur
          shadow-2xl
          border-transparent
        "
      >
        <DialogTitle>Selecciona otro servicio</DialogTitle>

        <input
          autoFocus
          placeholder="Buscar servicios"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full
            rounded-xl
            border border-black/10
            px-4 py-3
            text-sm
            outline-none
            mt-3
            focus:border-[#D4A64E]
          "
        />

        <div className="mt-4 space-y-2">
          {suggestions.map((service) => {
            const isSelected = selectedIds.includes(service.id);

            return (
              <button
                key={service.id}
                disabled={isSelected}
                onClick={() => {
                  onSelect(service);
                  setOpen(false); // 👈 CIERRA el modal correctamente
                }}
                className={`
                  w-full rounded-lg px-4 py-3 text-left transition
                  ${
                    isSelected
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-[#FDEAF2]/40"
                  }
                `}
              >
                <p className="text-sm font-medium">{service.name}</p>
                <p className="text-xs text-black/60">
                  {service.duration} min · ${service.price.toLocaleString()}
                </p>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
