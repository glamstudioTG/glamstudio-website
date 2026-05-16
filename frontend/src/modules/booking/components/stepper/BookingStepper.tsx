// BookingStepper.tsx
"use client";

import { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { BookingStepperProps, BookingDraft } from "../../types/booking.types";

export default function BookingStepper({
  currentStep,
  steps,
  navigation,
}: BookingStepperProps<BookingDraft>) {
  return (
    <div className="mx-auto mt-6 w-full max-w-6xl rounded-2xl bg-[#EE6983]/80 px-4 py-5 sm:px-6 sm:py-6">
      <div className="flex items-center w-full">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <Fragment key={step.id}>
              <button
                onClick={() => navigation.goToStep(step.id)}
                className="flex flex-col items-center gap-1.5 shrink-0 focus:outline-none"
                aria-label={`Ir al paso ${step.id}: ${step.label}`}
              >
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className={[
                    "relative flex items-center justify-center rounded-full text-xs font-medium transition-colors duration-300",
                    "h-8 w-8 sm:h-10 sm:w-10",
                    isActive
                      ? "bg-[#FFC6C5] border-2 border-[#FFC6C5] text-[#3d0010] shadow-[0_0_0_4px_rgba(255,198,197,0.3)]"
                      : isCompleted
                        ? "bg-[#FFC6C5]/70 border-2 border-[#FFC6C5]/70 text-[#3d0010]"
                        : "bg-transparent border-2 border-white/50 text-black/60",
                  ].join(" ")}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isCompleted ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="num"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[11px] sm:text-xs font-semibold"
                      >
                        {step.id}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>

                <span
                  className={[
                    "text-center leading-tight transition-all duration-200",
                    isActive
                      ? "text-[10px] sm:text-[11px] font-medium text-black/90 max-w-13 sm:max-w-16"
                      : "text-[10px] sm:text-[11px] font-normal text-black/60 max-w-13 sm:max-w-16",
                    !isActive ? "hidden sm:block" : "block",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </button>

              {index < steps.length - 1 && (
                <div className="flex-1 mx-1 sm:mx-2 mb-6 sm:mb-7 h-0.5 rounded-full bg-white/25 overflow-hidden min-w-0">
                  <motion.div
                    className="h-full rounded-full bg-[#FFC6C5]"
                    initial={false}
                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                    style={{ transformOrigin: "left" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
      <div className="mt-3 h-0.75 w-full rounded-full bg-white/20 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[#FFC6C5]"
          initial={false}
          animate={{ scaleX: currentStep / steps.length }}
          style={{ transformOrigin: "left" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      \{" "}
      <div className="mt-2 flex justify-between items-center sm:hidden">
        <span className="text-[11px] text-black/50">
          Paso {currentStep} de {steps.length}
        </span>
        <span className="text-[11px] font-medium text-black/70">
          {steps.find((s) => s.id === currentStep)?.label}
        </span>
      </div>
    </div>
  );
}
