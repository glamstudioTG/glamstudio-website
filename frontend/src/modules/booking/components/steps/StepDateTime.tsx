"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { Calendar } from "@/src/components/ui/shadcn-io/calendar/calendar";
import { Calendar1 } from "lucide-react";
import StepHeader from "../../service/StepUtils/StepHeader";
import { StepProps } from "../../types/booking.types";
import { useAvailabilityQuery } from "../../hooks/query/useAvailability";

function SlotsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-12 rounded-lg bg-black/10 animate-pulse" />
      ))}
    </div>
  );
}

export default function StepDateTime({ booking, navigation }: StepProps) {
  const selectedDate = booking.state.date;
  const selectedTime = booking.state.time;
  const selectedWorker = booking.state.selectedWorker;

  const totalDuration = booking.state.services.reduce(
    (acc, s) => acc + s.duration,
    0,
  );

  const {
    data: slots,
    isLoading,
    isError,
  } = useAvailabilityQuery(selectedWorker?.id, selectedDate, totalDuration);

  useEffect(() => {
    navigation.setContext(booking.state);
  }, [booking.state]);

  const canContinue = !!selectedDate && !!selectedTime;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="
        mx-auto max-w-6xl rounded-xl
        bg-[#EDB9B9] p-5 sm:p-6 md:p-8 space-y-6
      "
    >
      <StepHeader title="Elige fecha y hora" step={3} icon={Calendar1} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-7 space-y-3">
          <p className="text-sm font-medium text-black">Seleccionar fecha</p>

          <Calendar
            mode="single"
            selected={selectedDate ?? undefined}
            onSelect={(date) => date && booking.setDate(date)}
            disabled={{ before: new Date() }}
            className="w-full rounded-xl border border-[#850E35] bg-[#FFF5E4] p-4 text-black"
          />
        </div>

        <div className="hidden lg:flex lg:col-span-1 justify-center">
          <div className="h-full w-px bg-[#850E35]/40" />
        </div>

        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-black">Horario disponible</p>
            <span className="text-xs text-black/50">(elige uno)</span>
          </div>

          {isLoading && <SlotsSkeleton />}

          {isError && (
            <p className="text-sm text-red-600">
              Error cargando disponibilidad
            </p>
          )}

          {!isLoading && !isError && slots?.length === 0 && (
            <p className="text-sm text-black/60">
              No hay horarios disponibles para esta fecha
            </p>
          )}

          {!isLoading && !isError && slots && slots.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
              {slots.map((slot) => {
                const value = slot.start;

                return (
                  <motion.button
                    key={slot.startMin}
                    onClick={() => booking.setTime(value)}
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.04 }}
                    className={`
                      h-12 rounded-lg border text-sm font-medium transition
                      ${
                        selectedTime === value
                          ? "border-[#850E35] bg-[#850E35] text-white"
                          : "border-[#850E35]/40 bg-white/70 text-black hover:bg-white"
                      }
                    `}
                  >
                    {slot.start} – {slot.end}
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-4">
        <button
          onClick={navigation.prevStep}
          className="w-full sm:w-auto
            rounded-full border border-[#850E35]
            px-6 py-3 text-sm text-black
            hover:bg-white/40 transition cursor-pointer"
        >
          Volver
        </button>

        <button
          disabled={!canContinue}
          onClick={navigation.nextStep}
          className="
            w-full sm:w-auto
            rounded-full bg-[#850E35]
            px-6 py-3 text-sm font-medium text-white
            transition-all
            disabled:opacity-40 cursor-pointer
            enabled:hover:scale-[1.03]
          "
        >
          Siguiente
        </button>
      </div>
    </motion.div>
  );
}
