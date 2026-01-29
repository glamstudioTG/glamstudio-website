import { Fragment } from "react";
import { BookingStepperProps } from "../../types/booking.types";

export default function BookingStepper({
  currentStep,
  steps,
  navigation,
}: BookingStepperProps) {
  return (
    <div className="mx-auto mt-10 w-[80%] rounded-xl bg-[#EE6983]/80 px-10 py-8">
      <div
        className="grid items-center"
        style={{
          gridTemplateColumns: `repeat(${
            steps.length * 2 - 1
          }, minmax(0, 1fr))`,
        }}
      >
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <Fragment key={step.id}>
              <div className="flex flex-col items-center justify-center">
                <button onClick={() => navigation.goToStep(step.id)}>
                  <div
                    className={[
                      "flex h-12 w-12 items-center justify-center rounded-full border-4 text-sm font-medium transition-all duration-300",
                      isActive &&
                        "bg-[#850E35] border-[#850E35] text-white animate-[goldPulse_1.8s_infinite]",
                      isCompleted &&
                        "bg-[#850E35]/80 border-[#850E35]/80 text-black",
                      !isActive &&
                        !isCompleted &&
                        "border-white/60 text-black/70 font-bold",
                    ].join(" ")}
                  >
                    {step.id}
                  </div>

                  <span className="mt-2 text-xs text-black/80">
                    {step.label}
                  </span>
                </button>
              </div>

              {index < steps.length - 1 && (
                <div className="flex items-center">
                  <div className="relative h-1.5 w-full rounded-full bg-white/30 overflow-hidden">
                    {isCompleted && (
                      <div className="absolute inset-0 rounded-full bg-[#850E35]" />
                    )}

                    {isActive && (
                      <div className="absolute left-0 top-0 h-full w-1/2 rounded-full bg-[#850E35]">
                        <div
                          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
                          style={{
                            width: "36px",
                            height: "10px",
                            background: `
                              linear-gradient(
                                90deg,
                                rgba(133, 14, 53, 1) 0%,
                                rgba(133, 14, 53, 0.8) 40%,
                                rgba(133, 14, 53, 0.3) 70%,
                                rgba(133, 14, 53, 0) 100%
                              )
                            `,
                            filter:
                              "blur(1px) drop-shadow(0 0 6px rgba(212,166,78,0.8))",
                            animation: "wickGlow 1.2s ease-in-out infinite",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
