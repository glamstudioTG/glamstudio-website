"use client";

import { useEffect } from "react";
import { StepProps } from "../../../types/booking.types";
import StepHeader from "../../../service/StepUtils/StepHeader";
import ServiceBrowser from "./ServiceBrowser";
import SelectedServicesSummary from "./SelectedServicesSummary";
import AddServiceDialog from "./AddServiceDialog";
import { Sparkles } from "lucide-react";

export default function StepServices({ booking, navigation }: StepProps) {
  useEffect(() => {
    navigation.setContext(booking.state);
  }, [booking.state]);

  const handleNext = () => {
    if (booking.state.services.length === 0) return;
    navigation.nextStep();
  };

  return (
    <div className="rounded-xl bg-[#EDB9B9] p-8 space-y-8 max-w-270 mx-auto">
      <div className="">
        <StepHeader step={1} title="Selecciona un servicio" icon={Sparkles} />
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <ServiceBrowser booking={booking} />
        </div>

        <div className="col-span-4 space-y-4">
          <div className="flex justify-end mb-16">
            <AddServiceDialog
              selectedIds={booking.state.services.map((s) => s.id)}
              onSelect={(service) => booking.addService(service)}
            />
          </div>

          <SelectedServicesSummary booking={booking} />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={handleNext}
          disabled={booking.state.services.length === 0}
          className="rounded-full bg-[#850E35] px-6 py-2 text-white text-sm font-medium disabled:opacity-40 cursor-pointer"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
