"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/shadcn-io/dialog/dialog";
import { useCreateOverrideHours } from "../../hooks/useOverrideHours";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  workerId: string;
  baseDate: string;
};

export default function CreateOverrideHoursDialog({
  open,
  onOpenChange,
  workerId,
  baseDate,
}: Props) {
  const [date, setDate] = useState(baseDate);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");

  const createOverride = useCreateOverrideHours(workerId, date);

  const submit = () => {
    createOverride.mutate(
      {
        date,
        startTime: start,
        endTime: end,
      },
      {
        onSuccess: () => onOpenChange(false),
        onError: (error: any) => {
          if (error?.status === 409) {
            alert("Ya existe un horario especial para este día.");
          } else {
            alert("Ocurrió un error inesperado.");
          }
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#FFE7C7]/90">
        <DialogHeader>
          <DialogTitle className="font-mono text-black text-3xl">
            Crear horario especial
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Define un horario especial para un día específico.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3 text-black">
          <div>
            <label className="text-sm font-medium">Fecha</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex gap-2">
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
        </div>

        <button
          onClick={submit}
          disabled={createOverride.isPending}
          className="w-full mt-6 bg-[#F59E0B] text-white py-2 rounded-lg hover:bg-[#F59E0B]/80 transition disabled:opacity-50"
        >
          Crear override
        </button>
      </DialogContent>
    </Dialog>
  );
}
