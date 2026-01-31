import { useCallback, useMemo, useState } from "react";
import { UseStepNavigationProps } from "../types/booking.types";

export default function useStepNavigation({
  totalSteps,
  validators,
}: UseStepNavigationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [context, setContext] = useState<unknown>(null);

  const canGoNext = useMemo(() => {
    const validator = validators?.[currentStep];
    return validator ? validator(context) : true;
  }, [currentStep, validators, context]);

  const nextStep = useCallback(() => {
    if (!canGoNext) return;
    setDirection(1);
    setCurrentStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  }, [canGoNext, totalSteps]);

  const prevStep = useCallback(() => {
    setDirection(-1);
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      if (step < 1 || step > totalSteps) return;

      setDirection(step > currentStep ? 1 : -1);

      if (step <= currentStep) return setCurrentStep(step);

      for (let i = 1; i < step; i++) {
        const validator = validators?.[i];
        if (validator && !validator(i)) {
          return;
        }
      }

      setCurrentStep(step);
    },
    [totalSteps, currentStep, validators],
  );

  return {
    currentStep,
    totalSteps,
    direction,
    canGoNext,

    nextStep,
    setContext,
    prevStep,
    goToStep,
  };
}
