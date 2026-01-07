"use client";

import { useBookingForm } from "../hooks/useBookingForm";
import useStepNavigation from "../hooks/useStepNavigation";
import BookingStepper from "./stepper/BookingStepper";

import StepDateTime from "./steps/StepDateTime";
import StepUserInfo from "./steps/StepUserInfo";
import StepServices from "./steps/stepService/StepServices";
import StepSummary from "./steps/StepSummary";

const STEPS = [
  { id: 1, label: "Servicios" },
  { id: 2, label: "Tus detalles" },
  { id: 3, label: "Fecha y hora" },
  { id: 4, label: "Revisión y recibo" },
];

export default function BookingSection() {
  const booking = useBookingForm();

  const navigation = useStepNavigation({
    totalSteps: STEPS.length,
    validators: {
      1: () => booking.state.services.length > 0,
      2: () => Boolean(booking.state.userInfo),
      3: () => Boolean(booking.state.date && booking.state.time),
    },
  });

  return (
    <section className="mx-auto max-w-6xl space-y-10 py-16 ">
      <BookingStepper
        currentStep={navigation.currentStep}
        steps={STEPS}
        navigation={navigation}
      />
      {navigation.currentStep === 1 && (
        <StepServices booking={booking} navigation={navigation} />
      )}

      {navigation.currentStep === 2 && (
        <StepUserInfo booking={booking} navigation={navigation} />
      )}

      {navigation.currentStep === 3 && (
        <StepDateTime booking={booking} navigation={navigation} />
      )}

      {navigation.currentStep === 4 && (
        <StepSummary booking={booking} navigation={navigation} />
      )}
    </section>
  );
}
