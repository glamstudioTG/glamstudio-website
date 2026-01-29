"use client";

import { useState } from "react";
import { StepProps } from "../../types/booking.types";
import { Calendar } from "@/src/components/ui/shadcn-io/calendar/calendar";
import { Calendar1 } from "lucide-react";
import { DayAvailability } from "../../types/booking.types";
import {
  isDayFullyBooked,
  isDayPartiallyBooked,
} from "../../utils/availability.utils";
import StepHeader from "../../service/StepUtils/StepHeader";

export default function StepDateTime({ booking, navigation }: StepProps) {
  const [availability, setAvailability] = useState<DayAvailability[]>([
    { date: "2026-01-10", totalSlots: 6, bookedSlots: 6 },
    { date: "2026-01-11", totalSlots: 6, bookedSlots: 4 },
  ]);

  const selectedDate = booking.state.date ?? undefined;
  const selectedTime = booking.state.time ?? null;

  const handleNext = () => {
    if (!selectedDate || !selectedTime) return;

    booking.setDate(selectedDate);
    booking.setTime(selectedTime);
    navigation.nextStep();
  };

  return (
    <div className="max-w-[85%] rounded-xl bg-[#EDB9B9] p-8 space-y-6 m-auto">
      <StepHeader title="Elige fecha y hora" step={3} icon={Calendar1} />

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-7">
          <p className="mb-3 text-sm font-medium text-black">
            Seleccionar fecha
          </p>

          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) booking.setDate(date);
            }}
            disabled={[
              { before: new Date() },
              (date) => isDayFullyBooked(date, availability),
            ]}
            modifiers={{
              fullyBooked: (date) => isDayFullyBooked(date, availability),
              partiallyBooked: (date) =>
                isDayPartiallyBooked(date, availability),
            }}
            className="w-full rounded-xl border border-[#850E35] bg-[#FFF5E4] p-4 text-black"
          />
          <legend className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-black/70">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-[#850E35] bg-white" />
              <span>Disponible</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#f9a2b2] " />
              <span>Seleccionado</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-[#850E35] bg-[#f3c785]" />
              <span>Pocos cupos</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-200" />
              <span>No disponible</span>
            </div>
          </legend>
        </div>

        <div className="col-span-1 flex justify-center">
          <div className="h-full w-px bg-[#850E35]/40" />
        </div>

        <div className="col-span-4">
          <div className="mb-3 flex items-center gap-2">
            <p className="text-sm font-medium text-black">Horario disponible</p>
            <span className="text-xs text-black/50">(selecciona uno)</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              "08:00 AM",
              "10:00 AM",
              "12:00 PM",
              "02:00 PM",
              "06:00 PM",
              "08:00 PM",
            ].map((time) => (
              <button
                key={time}
                onClick={() => booking.setTime(time)}
                className={`h-12 rounded-lg border text-sm font-medium transition ${
                  selectedTime === time
                    ? "border-[#850E35] bg-[#850E35] text-white"
                    : "border-[#850E35]/40 bg-white/60 text-black hover:bg-white"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          className="rounded-full border border-[#850E35] px-6 py-2 text-sm text-black cursor-pointer"
          onClick={navigation.prevStep}
        >
          Volver
        </button>

        <button
          disabled={!selectedDate || !selectedTime}
          onClick={handleNext}
          className="rounded-full bg-[#850E35] px-6 py-2 text-sm font-medium text-white disabled:opacity-40 cursor-pointer"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
