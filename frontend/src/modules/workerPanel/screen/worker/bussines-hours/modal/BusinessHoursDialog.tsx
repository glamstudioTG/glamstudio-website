"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/shadcn-io/dialog/dialog";
import { DayOfWeek, BusinessHour } from "../types/business-hours.types";
import {
  useCreateBusinessHours,
  useUpdateBusinessHours,
} from "../hooks/useBusinessHours";
import { DAY_LABELS_ES } from "../utils/dayLabels";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workerId: string;
  day: DayOfWeek;
  initialData?: BusinessHour;
};

export default function BusinessHoursDialog({
  open,
  onOpenChange,
  workerId,
  day,
  initialData,
}: Props) {
  const isEdit = !!initialData;

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");

  const createMutation = useCreateBusinessHours(workerId);
  const updateMutation = useUpdateBusinessHours(workerId);

  useEffect(() => {
    if (initialData) {
      setStartTime(minutesToHHMM(initialData.startTime));
      setEndTime(minutesToHHMM(initialData.endTime));
    }
  }, [initialData]);

  const isLoading = createMutation.isPending || updateMutation.isPending;

  function onSubmit() {
    if (isEdit && initialData) {
      updateMutation.mutate(
        {
          id: initialData.id,
          payload: { startTime, endTime },
        },
        { onSuccess: () => onOpenChange(false) },
      );
    } else {
      createMutation.mutate(
        { day, startTime, endTime },
        { onSuccess: () => onOpenChange(false) },
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#FFD7D7]/95">
        <DialogHeader>
          <DialogTitle className="text-black">
            {isEdit ? "Editar horario" : "Agregar horario"}
          </DialogTitle>
          <DialogDescription>{DAY_LABELS_ES[day]}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-1">
            <label className="text-sm font-medium text-black">
              Hora de inicio
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="rounded-md border px-3 py-2 text-black"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium text-black ">
              Hora de fin
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="rounded-md border px-3 py-2 text-black"
            />
          </div>
        </div>

        <DialogFooter>
          <button
            className="rounded-md border px-4 py-2 text-sm text-black"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </button>

          <button
            disabled={isLoading}
            className="rounded-md bg-[#850E35] px-4 py-2 text-sm text-white hover:bg-[#850E35]/80 disabled:opacity-50"
            onClick={onSubmit}
          >
            {isEdit ? "Guardar cambios" : "Guardar horario"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function minutesToHHMM(minutes: number) {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}
