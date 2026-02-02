"use client";

import { Trash, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BookingForm, BookingService } from "../../../types/booking.types";

interface Props {
  booking: BookingForm;
  services: BookingService[];
}

export default function ServiceList({ booking, services }: Props) {
  const toggleService = (service: BookingService) => {
    const exists = booking.state.services.some((s) => s.id === service.id);

    if (exists) {
      booking.removeService(service.id);
    } else {
      booking.addService(service);
    }
  };

  return (
    <div className="space-y-4 max-h-82.5 overflow-y-auto p-5">
      {services.map((service) => {
        const selected = booking.state.services.some(
          (s) => s.id === service.id,
        );

        return (
          <motion.div
            key={service.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-2"
          >
            <motion.button
              layout
              onClick={() => toggleService(service)}
              className="group relative w-full text-left"
            >
              <motion.span
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: selected ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="
                  pointer-events-none absolute inset-0 rounded-xl
                  bg-[#850E35]/70 blur-md
                "
              />

              <motion.div
                layout
                className={`
                  relative z-10 grid grid-cols-[1fr_auto_auto]
                  items-center gap-6
                  rounded-xl px-5 py-4
                  bg-[#FFF5E4]
                  transition-colors duration-300
                  ${selected ? "border border-[#850E35]/70" : ""}
                `}
                animate={{ scale: selected ? 1.02 : 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div>
                  <p className="font-medium text-black leading-tight">
                    {service.name}
                  </p>
                  <p className="text-xs text-black/60">{service.description}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-black">
                    ${service.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-black/60">
                    {service.duration} min
                  </p>
                </div>

                <div className="w-8 flex justify-end text-[#850E35]">
                  <AnimatePresence mode="wait">
                    {selected ? (
                      <motion.span
                        key="trash"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="cursor-pointer"
                      >
                        <Trash size={18} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="plus"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="cursor-pointer"
                      >
                        <Plus size={18} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.button>
          </motion.div>
        );
      })}
    </div>
  );
}
