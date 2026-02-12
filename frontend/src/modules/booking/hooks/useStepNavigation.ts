import { useCallback, useMemo, useState } from "react";
import { UseStepNavigationProps } from "../types/booking.types";

export default function useStepNavigation<T>({
  totalSteps,
  validators,
}: UseStepNavigationProps<T>) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [context, setContext] = useState<T | null>(null);

  const canGoNext = useMemo(() => {
    const validator = validators?.[currentStep];
    if (!validator) return true;
    if (context === null) return false;

    return validator(context);
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

      if (step <= currentStep) {
        setCurrentStep(step);
        return;
      }

      for (let i = 1; i < step; i++) {
        const validator = validators?.[i];
        if (validator && context !== null && !validator(context)) {
          return;
        }
      }

      setCurrentStep(step);
    },
    [totalSteps, currentStep, validators, context],
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
