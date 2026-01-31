"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
  useEffect(() => {
    navigation.setContext(booking.state);
  }, [booking.state]);

  const [availability] = useState<DayAvailability[]>([
    { date: "2026-01-10", totalSlots: 6, bookedSlots: 6 },
    { date: "2026-01-11", totalSlots: 6, bookedSlots: 4 },
  ]);

  const selectedDate = booking.state.date ?? undefined;
  const selectedTime = booking.state.time ?? null;

  const handleNext = () => {
    if (!selectedDate || !selectedTime) return;
    navigation.nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="
        mx-auto
        max-w-6xl
        rounded-xl
        bg-[#EDB9B9]
        p-5 sm:p-6 md:p-8
        space-y-6
      "
    >
      <StepHeader title="Elige fecha y hora" step={3} icon={Calendar1} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="lg:col-span-7 space-y-3"
        >
          <p className="text-sm font-medium text-black">Seleccionar fecha</p>

          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && booking.setDate(date)}
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

          <div className="flex flex-wrap justify-center gap-4 pt-2 text-xs text-black/70">
            {[
              ["border-[#850E35] bg-white", "Disponible"],
              ["bg-[#f9a2b2]", "Seleccionado"],
              ["border-[#850E35] bg-[#f3c785]", "Pocos cupos"],
              ["bg-red-200", "No disponible"],
            ].map(([style, label]) => (
              <div key={label} className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full border ${style}`} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="hidden lg:flex lg:col-span-1 justify-center">
          <div className="h-full w-px bg-[#850E35]/40" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
          className="lg:col-span-4 space-y-3"
        >
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-black">Horario disponible</p>
            <span className="text-xs text-black/50">(elige uno)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
            {[
              "08:00 AM",
              "10:00 AM",
              "12:00 PM",
              "02:00 PM",
              "06:00 PM",
              "08:00 PM",
            ].map((time) => (
              <motion.button
                key={time}
                onClick={() => booking.setTime(time)}
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.04 }}
                className={`
                  h-12 rounded-lg border text-sm font-medium transition
                  ${
                    selectedTime === time
                      ? "border-[#850E35] bg-[#850E35] text-white"
                      : "border-[#850E35]/40 bg-white/70 text-black hover:bg-white"
                  }
                `}
              >
                {time}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={navigation.prevStep}
          className="
            w-full sm:w-auto
            rounded-full
            border border-[#850E35]
            px-6 py-3
            text-sm text-black
          "
        >
          Volver
        </motion.button>

        <motion.button
          whileHover={{ scale: selectedDate && selectedTime ? 1.05 : 1 }}
          whileTap={{ scale: 0.97 }}
          disabled={!selectedDate || !selectedTime}
          onClick={handleNext}
          className="
            w-full sm:w-auto
            rounded-full
            bg-[#850E35]
            px-6 py-3
            text-sm font-medium text-white
            disabled:opacity-40
          "
        >
          Siguiente
        </motion.button>
      </div>
    </motion.div>
  );
}
