"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "@/src/components/ui/shadcn-io/calendar/calendar";
import { Calendar1 } from "lucide-react";
import StepHeader from "../../service/StepUtils/StepHeader";
import { BookingDraft, StepProps } from "../../types/booking.types";
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

export default function StepDateTime({
  booking,
  navigation,
}: StepProps<BookingDraft>) {
  const selectedDate = booking.state.date;
  const selectedTime = booking.state.time;
  const selectedWorker = booking.state.selectedWorker;

  const slotsSectionRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const [highlightSlots, setHighlightSlots] = useState(false);
  const [highlightNext, setHighlightNext] = useState(false);

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

    if (!slots || !selectedTime) return;

    const stillValid = slots.some((s) => s.start === selectedTime);

    if (!stillValid) {
      booking.setTime(null);
    }
  }, [booking.state, slots, selectedTime]);

  useEffect(() => {
    if (!selectedDate) return;

    const timer = setTimeout(() => {
      slotsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setHighlightSlots(true);
      setTimeout(() => setHighlightNext(false), 2000);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedDate]);

  useEffect(() => {
    if (!selectedTime) return;

    const timer = setTimeout(() => {
      nextButtonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setHighlightNext(true);
      setTimeout(() => setHighlightNext(false), 1800);
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedTime]);

  const canContinue = !!selectedDate && !!selectedTime;

  const isReady = !!slots && !isLoading;

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

          <div className="w-full overflow-hidden rounded-xl border border-[#850E35] bg-[#FFF5E4] p-3 sm:p-4">
            <Calendar
              mode="single"
              selected={selectedDate ?? undefined}
              onSelect={(date) => {
                if (!date) return;
                const safeDate = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate(),
                );
                booking.setDate(safeDate);
              }}
              disabled={{ before: new Date() }}
              className="text-black"
            />
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-1 justify-center">
          <div className="h-full w-px bg-[#850E35]/40" />
        </div>

        <div
          ref={slotsSectionRef}
          className={`
            lg:col-span-4 space-y-3
            rounded-xl p-3 -m-3
            border-2 transition-all duration-700
            ${
              highlightSlots
                ? "border-[#850E35] shadow-[0_0_0_4px_rgba(133,14,53,0.15)]"
                : "border-transparent"
            }
          `}
        >
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-black">Horario disponible</p>
            <span className="text-xs text-black/50">(elige uno)</span>
          </div>

          {!selectedDate && (
            <p className="text-sm text-black/40 italic">
              Primero selecciona una fecha
            </p>
          )}

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

          {isReady && slots.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
              {slots.map((slot) => {
                const value = slot.start;

                return (
                  <motion.button
                    key={slot.startMin}
                    onClick={() => {
                      if (!slots.some((s) => s.start === value)) return;
                      booking.setTime(value);
                    }}
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
          ref={nextButtonRef}
          disabled={!canContinue}
          onClick={navigation.nextStep}
          className={`
            w-full sm:w-auto
            rounded-full bg-[#850E35]
            px-6 py-3 text-sm font-medium text-white
            transition-all duration-500
            disabled:opacity-40 cursor-pointer
            enabled:hover:scale-[1.03]
            ${highlightNext ? "ring-4 ring-[#850E35]/40 scale-[1.04]" : ""}
          `}
        >
          Siguiente
        </button>
      </div>
    </motion.div>
  );
}
