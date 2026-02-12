"use client";

import { useState } from "react";
import BusinessHoursDialog from "../modal/BusinessHoursDialog";
import { DayOfWeek } from "../types/business-hours.types";

export default function BusinessHoursEmptyState({
  workerId,
}: {
  workerId: string;
}) {
  const [open, setOpen] = useState(false);

  const defaultDay: DayOfWeek = DayOfWeek.MONDAY;

  return (
    <>
      <div className="mt-10 rounded-xl border border-dashed border-pink-200 bg-pink-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-pink-700">
          Configura tu horario de trabajo
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          Aún no tienes horarios configurados. Esto es necesario para poder
          recibir reservas.
        </p>

        <button
          className="mt-4 rounded-lg bg-[#850E35] px-4 py-2 text-sm font-medium text-white hover:bg-[#850E35]/80"
          onClick={() => setOpen(true)}
        >
          Crear horarios
        </button>
      </div>

      <BusinessHoursDialog
        open={open}
        onOpenChange={setOpen}
        workerId={workerId}
        day={defaultDay}
      />
    </>
  );
}
