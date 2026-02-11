"use client";

import BusinessHoursItem from "./BusinessHoursItem";
import { BusinessHour, DayOfWeek } from "../types/business-hours.types";
import { DAY_LABELS_ES } from "../utils/dayLabels";
import clsx from "clsx";
import { useState } from "react";
import BusinessHoursDialog from "../modal/BusinessHoursDialog";
import { Coffee } from "lucide-react";

export default function BusinessHoursDay({
  day,
  items,
  workerId,
}: {
  day: DayOfWeek;
  items: BusinessHour[];
  workerId: string;
}) {
  const [open, setOpen] = useState(false);
  const hasHours = items.length > 0;

  return (
    <div className="w-full max-w-175 rounded-xl border bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              "h-2.5 w-2.5 rounded-full",
              hasHours ? "bg-green-500" : "bg-gray-300",
            )}
          />

          <h4
            className={clsx(
              "font-semibold",
              hasHours ? "text-gray-800" : "text-gray-400",
            )}
          >
            {DAY_LABELS_ES[day]}
          </h4>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="text-sm text-[#F6A2B1] hover:bg-[#F6A2B1]/40 rounded-2xl px-3 py-1"
        >
          + Agregar horario
        </button>

        <BusinessHoursDialog
          open={open}
          onOpenChange={setOpen}
          workerId={workerId}
          day={day}
        />
      </div>

      {hasHours ? (
        <div className="flex flex-col items-center gap-2">
          {items.map((item) => (
            <BusinessHoursItem key={item.id} item={item} workerId={workerId} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 py-4 text-gray-400">
          <Coffee size={16} className="opacity-70" />
          <span className="text-sm">Sin horario configurado</span>
        </div>
      )}
    </div>
  );
}
