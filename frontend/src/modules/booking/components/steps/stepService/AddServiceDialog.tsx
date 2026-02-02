"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/src/components/ui/shadcn-io/dialog/dialog";
import { BookingService } from "../../../types/booking.types";
import { useDebouncedValue } from "../../../hooks/query/useDebouncedValue";
import { useSearchServicesQuery } from "../../../hooks/query/step1.queries";

interface Props {
  onSelect: (service: BookingService) => void;
  selectedIds: string[];
}

export default function AddServiceDialog({ onSelect, selectedIds }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const debouncedQuery = useDebouncedValue(query, 400);

  const { data: suggestions = [], isLoading } =
    useSearchServicesQuery(debouncedQuery);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) setQuery("");
      }}
    >
      <DialogTrigger asChild>
        <button className="rounded-full border border-[#850E35] px-4 py-2 text-sm text-black cursor-pointer">
          + Añadir más servicios
        </button>
      </DialogTrigger>

      <DialogContent
        className="
        text-black
        max-w-xl rounded-2xl
        bg-black/5 backdrop-blur
        shadow-2xl
        border-transparent
        animate-in fade-in zoom-in-95
        duration-200
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
            focus:border-[#850E35]
          "
        />

        <div className="mt-4 space-y-2">
          {isLoading && (
            <p className="text-xs text-black/60">Buscando servicios…</p>
          )}

          {!isLoading && suggestions.length === 0 && query.length >= 2 && (
            <p className="text-xs text-black/50">No se encontraron servicios</p>
          )}

          {suggestions.map((service) => {
            const isSelected = selectedIds.includes(service.id);

            return (
              <button
                key={service.id}
                disabled={isSelected}
                onClick={() => {
                  onSelect(service);
                  setOpen(false);
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
