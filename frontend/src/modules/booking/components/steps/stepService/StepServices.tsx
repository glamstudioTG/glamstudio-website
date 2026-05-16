"use client";

import { useEffect, useRef, useState } from "react";
import { BookingDraft, StepProps } from "../../../types/booking.types";
import StepHeader from "../../../service/StepUtils/StepHeader";
import ServiceBrowser from "./ServiceBrowser";
import SelectedServicesSummary from "./SelectedServicesSummary";
import AddServiceDialog from "./AddServiceDialog";
import { Sparkles } from "lucide-react";
import { motion, easeOut } from "framer-motion";
import ServiceWorkerGrid from "./ServiceWorkerGrid";
import { useWorkersByServicesMutation } from "../../../hooks/query/step1.queries";

export default function StepServices({
  booking,
  navigation,
}: StepProps<BookingDraft>) {
  const workersMutation = useWorkersByServicesMutation();
  const workerSectionRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const [highlightWorkers, setHighlightWorkers] = useState(false);
  const [highlightNext, setHighlightNext] = useState(false);

  const workerBlockShownRef = useRef(false);

  useEffect(() => {
    const hasServices = booking.state.services.length > 0;
    const noWorkerChosen = !booking.state.selectedWorker;

    if (!hasServices) {
      workerBlockShownRef.current = false;
      return;
    }

    const serviceIds = booking.state.services.map((s) => s.id);
    workersMutation.mutate(serviceIds);
    navigation.setContext(booking.state);

    if (noWorkerChosen && !workerBlockShownRef.current) {
      workerBlockShownRef.current = true;

      const timer = setTimeout(() => {
        workerSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setHighlightWorkers(true);
        setTimeout(() => setHighlightWorkers(false), 2000);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [booking.state.services]);

  useEffect(() => {
    if (!booking.state.selectedWorker) return;

    navigation.setContext(booking.state);

    const timer = setTimeout(() => {
      nextButtonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setHighlightNext(true);
      setTimeout(() => setHighlightNext(false), 1800);
    }, 200);

    return () => clearTimeout(timer);
  }, [booking.state.selectedWorker]);

  const compatibleWorkers = workersMutation.data ?? [];

  const handleNext = () => {
    if (booking.state.services.length === 0) return;
    navigation.nextStep();
  };

  const blockFade = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: easeOut },
    },
  };

  return (
    <div
      className="
        rounded-xl bg-[#F18398]/56
        p-5 sm:p-6 lg:p-8
        space-y-6
        max-w-7xl mx-auto
      "
    >
      <motion.div variants={blockFade} initial="hidden" animate="visible">
        <StepHeader step={1} title="Selecciona un servicio" icon={Sparkles} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-8 order-1 space-y-6">
          <ServiceBrowser booking={booking} />

          {booking.state.services.length > 0 && (
            <motion.div
              ref={workerSectionRef}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className={`
                rounded-xl bg-[#FDEAF2] p-5
                border-2 transition-all duration-700
                ${
                  highlightWorkers
                    ? "border-[#850E35] shadow-[0_0_0_4px_rgba(133,14,53,0.15)]"
                    : "border-transparent"
                }
              `}
            >
              <h4 className="mb-1 text-sm font-medium text-black">
                Selecciona tu especialista
              </h4>

              {!booking.state.selectedWorker && (
                <p className="mb-3 text-xs text-[#850E35]">
                  Elige una especialista para continuar
                </p>
              )}

              <ServiceWorkerGrid
                workers={compatibleWorkers}
                selected={booking.state.selectedWorker}
                onSelect={booking.setSelectedWorker}
              />
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-4 order-2 space-y-4">
          <motion.div
            variants={blockFade}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-end"
          >
            <AddServiceDialog
              selectedIds={booking.state.services.map((s) => s.id)}
              onSelect={booking.addService}
            />
          </motion.div>

          <motion.div
            variants={blockFade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="lg:sticky lg:top-24"
          >
            <SelectedServicesSummary booking={booking} />
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={blockFade}
        initial="hidden"
        animate="visible"
        className="
          flex flex-col-reverse gap-3 pt-4
          sm:flex-row sm:justify-between
          lg:justify-end
        "
      >
        <button
          ref={nextButtonRef}
          onClick={handleNext}
          disabled={
            booking.state.services.length === 0 || !booking.state.selectedWorker
          }
          className={`
            w-full sm:w-auto
            rounded-full bg-[#850E35]
            px-6 py-3
            text-white text-sm font-medium
            disabled:opacity-40
            transition-all duration-500
            cursor-pointer
            enabled:hover:scale-[1.03]
            ${highlightNext ? "ring-4 ring-[#850E35]/40 scale-[1.04]" : ""}
          `}
        >
          Siguiente
        </button>
      </motion.div>
    </div>
  );
}
