"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/shadcn-io/dialog/dialog";
import { useCreateScheduleBlock } from "../../hooks/useScheduleBlocks";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  workerId: string;
  baseDate: string;
};

export default function CreateScheduleBlockDialog({
  open,
  onOpenChange,
  workerId,
  baseDate,
}: Props) {
  const [type, setType] = useState<"full" | "range">("full");
  const [date, setDate] = useState(baseDate);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");
  const [reason, setReason] = useState("");

  const createBlock = useCreateScheduleBlock(workerId, baseDate);

  const submit = () => {
    createBlock.mutate(
      type === "full"
        ? { date, reason }
        : { date, startTime: start, endTime: end, reason },
      {
        onSuccess: () => onOpenChange(false),
        onError: (error: any) => {
          if (error?.status === 409) {
            alert(
              type === "full"
                ? "No puedes bloquear el día completo porque ya hay reservas o bloqueos."
                : "El rango de tiempo se cruza con otra reserva o bloqueo.",
            );
          } else {
            alert("Ocurrió un error inesperado.");
          }
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#FFD7D7]/90">
        <DialogHeader>
          <DialogTitle className="font-mono text-black text-3xl">
            Crea un bloqueo
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Bloquea un día completo o un rango de tiempo específico.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mt-4">
          {["full", "range"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t as any)}
              className={`flex-1 px-3 py-2 rounded-lg text-sm transition ${
                type === t
                  ? "bg-[#B0154E] text-white"
                  : "bg-gray-50 text-black hover:bg-gray-100"
              }`}
            >
              {t === "full" ? "Día completo" : "Rango de tiempo"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {type === "full" ? (
            <motion.div
              key="full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 space-y-3"
            >
              <label className="text-sm font-medium text-black">Fecha</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-black"
              />
            </motion.div>
          ) : (
            <motion.div
              key="range"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 space-y-3"
            >
              <div>
                <label className="text-sm font-medium text-black">Fecha</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-black"
                />
              </div>

              <div className="flex gap-2 text-black">
                <div className="flex-1">
                  <label className="text-sm font-medium">Inicio</label>
                  <input
                    type="time"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="w-full border rounded-lg px-2 py-2"
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium">Fin</label>
                  <input
                    type="time"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className="w-full border rounded-lg px-2 py-2"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4">
          <label className="text-sm font-medium text-black">
            Motivo del bloqueo
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ej: Vacaciones, cita médica, mantenimiento, evento personal…"
            rows={4}
            className="w-full mt-1 border rounded-lg px-3 py-2 text-black resize-none focus:outline-none focus:ring-2 focus:ring-[#B0154E]/40"
          />
        </div>

        <button
          onClick={submit}
          disabled={createBlock.isPending}
          className="w-full mt-6 bg-[#B0154E] text-white py-2 rounded-lg hover:bg-[#B0154E]/80 transition disabled:opacity-50"
        >
          Crear bloqueo
        </button>
      </DialogContent>
    </Dialog>
  );
}
