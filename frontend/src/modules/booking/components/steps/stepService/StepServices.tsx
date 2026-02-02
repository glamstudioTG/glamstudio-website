"use client";

import { useEffect } from "react";
import { StepProps } from "../../../types/booking.types";
import StepHeader from "../../../service/StepUtils/StepHeader";
import ServiceBrowser from "./ServiceBrowser";
import SelectedServicesSummary from "./SelectedServicesSummary";
import AddServiceDialog from "./AddServiceDialog";
import { Sparkles } from "lucide-react";
import { motion, easeOut } from "framer-motion";
import ServiceWorkerGrid from "./ServiceWorkerGrid";
import { useWorkersByServicesMutation } from "../../../hooks/query/step1.queries";

export default function StepServices({ booking, navigation }: StepProps) {
  const workersMutation = useWorkersByServicesMutation();

  useEffect(() => {
    if (booking.state.services.length === 0) return;

    const serviceIds = booking.state.services.map((s) => s.id);
    workersMutation.mutate(serviceIds);
  }, [booking.state.services]);

  useEffect(() => {
    navigation.setContext(booking.state);
  }, [booking.state.services, booking.state.selectedWorker]);

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
        rounded-xl bg-[#EDB9B9]
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
          {booking.state.services.length > 0 &&
            !booking.state.selectedWorker && (
              <p className="mb-2 text-xs text-[#850E35]">
                Debes elegir un especialista para continuar
              </p>
            )}

          {booking.state.services.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="
          rounded-xl
          bg-[#FDEAF2]
          p-5
          border border-[#850E35]/10
        "
            >
              <h4 className="mb-3 text-sm font-medium text-black">
                Selecciona tu especialista
              </h4>

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
          onClick={handleNext}
          disabled={
            booking.state.services.length === 0 || !booking.state.selectedWorker
          }
          className="
            w-full sm:w-auto
            rounded-full bg-[#850E35]
            px-6 py-3
            text-white text-sm font-medium
            disabled:opacity-40
            transition-all
            cursor-pointer
            enabled:hover:scale-[1.03]
          "
        >
          Siguiente
        </button>
      </motion.div>
    </div>
  );
}
