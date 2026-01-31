"use client";

import { motion } from "framer-motion";
import { BookingWorker } from "../../../types/booking.types";

interface Props {
  workers: BookingWorker[];
  selected: BookingWorker | null;
  onSelect: (worker: BookingWorker) => void;
}

export default function ServiceWorkerGrid({
  workers,
  selected,
  onSelect,
}: Props) {
  if (workers.length === 0) {
    return (
      <p className="text-sm text-black/60">
        No hay especialistas que realicen todos los servicios seleccionados.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {workers.map((worker) => {
        const active = selected?.id === worker.id;

        return (
          <motion.button
            key={worker.id}
            onClick={() => onSelect(worker)}
            whileTap={{ scale: 0.97 }}
            className={`
              flex items-center gap-3 rounded-xl p-4 text-left transition
              border
              ${
                active
                  ? "border-[#850E35]/70 bg-[#FDEAF2]"
                  : "border-black/10 bg-white"
              }
            `}
          >
            <div className="h-10 w-10 rounded-full bg-[#850E35]/10 flex items-center justify-center text-sm font-bold text-[#850E35]">
              {worker.name.charAt(0)}
            </div>

            <div>
              <p className="text-sm font-medium text-black">{worker.name}</p>
              <p className="text-xs text-black/60">Especialista disponible</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
