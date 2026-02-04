import { Fragment } from "react";
import { motion } from "framer-motion";
import { BookingStepperProps } from "../../types/booking.types";

export default function BookingStepper({
  currentStep,
  steps,
  navigation,
}: BookingStepperProps) {
  return (
    <div
      className="
        mx-auto mt-6
        w-full max-w-6xl
        rounded-xl bg-[#EE6983]/80
        px-4 py-4
        sm:px-6 sm:py-6
        md:px-10 md:py-8
      "
    >
      <div
        className="hidden md:grid items-center"
        style={{
          gridTemplateColumns: `repeat(${steps.length * 2 - 1}, minmax(0, 1fr))`,
        }}
      >
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <Fragment key={step.id}>
              <div className="flex flex-col items-center justify-center">
                <button onClick={() => navigation.goToStep(step.id)}>
                  <motion.div
                    layout
                    initial={false}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className={[
                      "relative flex h-12 w-12 items-center justify-center rounded-full border-4 text-sm font-medium",
                      "transition-colors duration-300",
                      isActive &&
                        "bg-[#FFC6C5] border-[#FFC6C5] text-black animate-[goldPulse_1.8s_infinite]",
                      isCompleted &&
                        "bg-[#FFC6C5]/80 border-[#FFC6C5]/80 text-black",
                      !isActive &&
                        !isCompleted &&
                        "border-white/60 text-black/70 font-bold",
                    ].join(" ")}
                  >
                    {isActive && (
                      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#EE6983]/30 blur-md animate-pulse" />
                    )}
                    <span className="relative z-10">{step.id}</span>
                  </motion.div>

                  <span className="mt-2 text-xs text-black/80">
                    {step.label}
                  </span>
                </button>
              </div>

              {index < steps.length - 1 && (
                <div className="flex items-center">
                  <div className="relative h-1.5 w-full rounded-full bg-white/30 overflow-hidden">
                    {isCompleted && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#FFC6C5]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        style={{ transformOrigin: "left" }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    )}
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      <div className="md:hidden">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 justify-center h-19">
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <button
                key={step.id}
                onClick={() => navigation.goToStep(step.id)}
                className="flex flex-col items-center shrink-0"
              >
                <motion.div
                  animate={{ scale: isActive ? 1.15 : 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className={[
                    "relative flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-semibold",
                    isActive && "bg-[#FFC6C5] border-[#FFC6C5] text-black",
                    isCompleted &&
                      "bg-[#FFC6C5]/80 border-[#FFC6C5]/80 text-black",
                    !isActive &&
                      !isCompleted &&
                      "border-white/60 text-black/70",
                  ].join(" ")}
                >
                  {step.id}
                </motion.div>

                {isActive && (
                  <span className="mt-1 text-[11px] font-medium text-black/80 whitespace-nowrap">
                    {step.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-3 h-1 w-full rounded-full bg-white/30">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: currentStep / steps.length,
            }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full rounded-full bg-[#FFC6C5]"
          />
        </div>
      </div>
    </div>
  );
}
