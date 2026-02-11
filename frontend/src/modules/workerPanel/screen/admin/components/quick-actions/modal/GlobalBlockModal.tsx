"use client";

import { useState } from "react";
import { CalendarX, AlertTriangle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useGlobalScheduleBlocks } from "../../../hooks/schedule-blocks/useGetGlobalSheduleBlock";
import { useCreateGlobalScheduleBlock } from "../../../hooks/schedule-blocks/useCreateScheduleBlock";
import { useDeleteGlobalScheduleBlock } from "../../../hooks/schedule-blocks/useDeleteScheduleBlock";
import { formatHumanDate } from "./utils/date-format";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/shadcn-io/dialog/dialog";

interface GlobalBlockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlobalBlockModal({
  open,
  onOpenChange,
}: GlobalBlockModalProps) {
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [fullDay, setFullDay] = useState(true);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [activeCard, setActiveCard] = useState<string | null>(null);

  const { data: blocks = [] } = useGlobalScheduleBlocks();
  const createMutation = useCreateGlobalScheduleBlock();
  const deleteMutation = useDeleteGlobalScheduleBlock();

  const handleCreate = async () => {
    if (!date) return;

    await createMutation.mutateAsync({
      date,
      reason,
      startTime: fullDay ? undefined : startTime,
      endTime: fullDay ? undefined : endTime,
    });

    setReason("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setFullDay(true);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          p-0
          w-full
          max-w-104.5
          sm:max-w-4xl
          max-h-[90vh]
          bg-white
          overflow-hidden
        "
      >
        <DialogHeader className="border-b px-4 sm:px-6 py-4">
          <DialogTitle className="flex items-center gap-2 text-[#850E35]">
            <CalendarX className="h-5 w-5" />
            Bloqueo de Agenda Global
          </DialogTitle>
        </DialogHeader>

        <div
          className="
            flex flex-col
            w-full
            overflow-x-hidden
            sm:grid sm:grid-cols-[280px_1fr]
          "
        >
          <div className="order-1 sm:order-2 p-4 sm:p-6 space-y-6 w-full">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <p className="text-sm text-red-700">
                  <strong>Advertencia de Bloqueo</strong>
                  <br />
                  Esta acción cerrará la disponibilidad para
                  <strong> TODOS los trabajadores</strong>.
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700">
                Motivo del Bloqueo
              </label>
              <input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Ej. Feriado Nacional, Mantenimiento..."
                className="
                  w-full rounded-md border border-neutral-300
                  px-3 py-2 text-sm text-black
                  focus:outline-none focus:ring-2
                  focus:ring-[#850E35]/30 cursor-pointer
                "
              />
            </div>

            <div className="space-y-2 rounded-lg border border-[#850E35] p-4">
              <p className="text-sm font-medium text-neutral-800">Fecha</p>

              <div className="flex items-center justify-between gap-3">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="
                    rounded-md border border-neutral-300
                    px-3 py-2 text-sm text-black cursor-pointer
                  "
                />

                <label className="flex items-center gap-2 text-sm text-neutral-700">
                  <input
                    type="checkbox"
                    checked={fullDay}
                    onChange={() => setFullDay(!fullDay)}
                    className="accent-[#850E35] cursor-pointer"
                  />
                  Día Completo
                </label>
              </div>

              {!fullDay && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-3"
                >
                  <div>
                    <label className="text-xs text-neutral-600">
                      Hora Inicio
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="
                        w-full rounded-md border border-neutral-300
                        px-2 py-1 text-sm text-black cursor-pointer
                      "
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-600">Hora Fin</label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="
                        w-full rounded-md border border-neutral-300
                        px-2 py-1 text-sm text-black cursor-pointer
                      "
                    />
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                onClick={() => onOpenChange(false)}
                className="
                  text-sm text-neutral-400
                  hover:bg-neutral-200
                  rounded-lg px-3 py-2 cursor-pointer
                "
              >
                Cancelar
              </button>

              <button
                onClick={handleCreate}
                disabled={createMutation.isPending}
                className="
                  rounded-md bg-red-600
                  px-4 py-2 text-sm
                  font-medium text-white
                  hover:bg-red-700 cursor-pointer
                "
              >
                Confirmar Bloqueo
              </button>
            </div>
          </div>

          <div
            className="
              order-2 sm:order-1
              bg-[#fff5f7]
              p-4
              sm:border-r
              max-h-65
              sm:max-h-[calc(90vh-96px)]
              overflow-x-auto
              sm:overflow-y-auto
            "
          >
            <div className="mb-3">
              <p className="text-sm font-bold text-neutral-800">
                Bloqueos Próximos
              </p>
              <p className="text-xs text-neutral-500">
                Lista de cierres programados
              </p>
            </div>

            <div className="flex gap-3 sm:flex-col sm:gap-3">
              {blocks.map((block) => (
                <div
                  key={block.id}
                  onMouseEnter={() => setActiveCard(block.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  onClick={() =>
                    setActiveCard(activeCard === block.id ? null : block.id)
                  }
                  className="
                    relative
                    min-w-60
                     max-w-60
                     sm:min-w-0
                     sm:max-w-none
                     shrink-0
                     rounded-lg border border-neutral-200
                     bg-white p-3
                  "
                >
                  <AnimatePresence>
                    {activeCard === block.id && (
                      <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => handleDelete(block.id)}
                        className="
                          absolute -top-2 -right-2
                          h-6 w-6 rounded-full
                          bg-red-600 text-black cursor-pointer
                          flex items-center justify-center
                        "
                      >
                        <X size={14} />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-black">
                      {formatHumanDate(block.date)}
                    </p>
                    <span className="rounded bg-red-600 px-2 py-0.5 text-xs text-white">
                      GLOBAL
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-neutral-500">
                    {block.startTime === null ? "Todo el día" : "Parcial"}
                  </p>

                  {block.reason && (
                    <p className="mt-1 text-sm text-gray-400">{block.reason}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
