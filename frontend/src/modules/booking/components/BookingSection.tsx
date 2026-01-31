"use client";

import { AnimatePresence, motion, easeOut, easeInOut } from "framer-motion";
import { useBookingForm } from "../hooks/useBookingForm";
import useStepNavigation from "../hooks/useStepNavigation";
import BookingStepper from "./stepper/BookingStepper";

import StepDateTime from "./steps/StepDateTime";
import StepUserInfo from "./steps/StepUserInfo";
import StepServices from "./steps/stepService/StepServices";
import StepSummary from "./steps/StepSummary";
import { BookingDraft } from "../types/booking.types";
import StepPaymentProof from "./steps/stepPaymentProof/StepPaymentProof";

const STEPS = [
  { id: 1, label: "Servicios" },
  { id: 2, label: "Tus detalles" },
  { id: 3, label: "Fecha y hora" },
  { id: 4, label: "Revisión y recibo" },
  { id: 5, label: "Pago" },
];

const stepVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
    filter: "blur(6px)",
  }),
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: easeOut },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
    filter: "blur(4px)",
    transition: { duration: 0.35, ease: easeInOut },
  }),
};

export default function BookingSection() {
  const booking = useBookingForm();

  const navigation = useStepNavigation({
    totalSteps: STEPS.length,
    validators: {
      1: (ctx) => {
        if (!ctx || typeof ctx !== "object") return false;

        const state = ctx as BookingDraft;

        if (!Array.isArray(state.services)) return false;

        return state.services.length > 0 && !!state.selectedWorker;
      },

      2: (ctx) => {
        if (!ctx) return false;
        const state = ctx as typeof booking.state;
        return Boolean(state.userInfo);
      },

      3: (ctx) => {
        if (!ctx) return false;
        const state = ctx as typeof booking.state;
        return Boolean(state.date && state.time);
      },
    },
  });

  return (
    <section className="bg-[#FFEAEA] mx-auto max-w-6xl py-16 space-y-12">
      <BookingStepper
        currentStep={navigation.currentStep}
        steps={STEPS}
        navigation={navigation}
      />

      <AnimatePresence mode="wait" custom={navigation.direction}>
        <motion.div
          key={navigation.currentStep}
          custom={navigation.direction}
          variants={stepVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
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

          {navigation.currentStep === 5 && (
            <StepPaymentProof booking={booking} navigation={navigation} />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
