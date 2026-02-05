"use client";

import { motion, AnimatePresence, easeOut } from "framer-motion";
import StepHeader from "../../service/StepUtils/StepHeader";
import { StepProps } from "../../types/booking.types";
import { TicketCheck } from "lucide-react";
import { minutesToTime } from "../../utils/time";

const container = {
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: easeOut,
      staggerChildren: 0.12,
    },
  },
  exit: { opacity: 0, y: 16, filter: "blur(4px)" },
};

const section = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeOut },
  },
};

const row = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0 },
};

export default function StepSummary({ booking, navigation }: StepProps) {
  const { date, time, userInfo, services } = booking.state;
  const totalPrice = services.reduce((acc, s) => acc + s.price, 0);

  const startMinutes = time ? Number(time) : null;
  const timeLabel = startMinutes !== null ? minutesToTime(startMinutes) : "-";

  const handleConfirm = async () => {
    try {
      const bookingId = await booking.confirmBooking();
      navigation.nextStep();
    } catch (e) {
      console.error(e);
      alert("Error creando la reserva");
    }
  };
  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="animate"
      exit="exit"
      className="
        mx-auto
        max-w-6xl
        rounded-xl
        bg-[#EDB9B9]
        p-5 sm:p-6 md:p-8
        space-y-8
      "
    >
      <StepHeader title="Resumen de tu cita" step={4} icon={TicketCheck} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-8 space-y-6">
          <motion.section variants={section} className="space-y-3">
            <h4 className="text-sm font-semibold text-black">
              Resumen de la cita
            </h4>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-black/80"
            >
              <motion.span variants={row}>Fecha</motion.span>
              <motion.span variants={row}>
                {date?.toLocaleDateString() || "-"}
              </motion.span>

              <motion.span variants={row}>Horario</motion.span>
              <motion.span variants={row}>{timeLabel}</motion.span>

              <motion.span variants={row}>Ubicación</motion.span>
              <motion.span variants={row}>
                GlamStudio · Ciudad Salitre
              </motion.span>
            </motion.div>
          </motion.section>
          <motion.section variants={section} className="space-y-3">
            <h4 className="text-sm font-semibold text-black">Tus detalles</h4>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-black/80"
            >
              <motion.span variants={row}>Nombre</motion.span>
              <motion.span variants={row}>{userInfo?.name}</motion.span>

              <motion.span variants={row}>Email</motion.span>
              <motion.span variants={row}>{userInfo?.email}</motion.span>

              <motion.span variants={row}>Teléfono</motion.span>
              <motion.span variants={row}>{userInfo?.phone}</motion.span>
            </motion.div>
          </motion.section>
          <motion.section variants={section} className="space-y-3">
            <h4 className="text-sm font-semibold text-black">Servicios</h4>

            <div className="space-y-2 text-sm">
              <AnimatePresence>
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="
                      grid grid-cols-3
                      sm:grid-cols-4
                      items-center
                      text-black/80
                    "
                  >
                    <span className="col-span-2">{service.name}</span>
                    <span className="hidden sm:block text-center">1</span>
                    <span className="text-right">
                      ${service.price.toLocaleString()}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="
                  mt-3
                  border-t border-black/20
                  pt-3
                  flex items-center justify-between
                  font-semibold text-black
                "
              >
                <span>Precio total</span>
                <span>${totalPrice.toLocaleString()}</span>
              </motion.div>
            </div>
          </motion.section>
        </div>
        <motion.div
          variants={section}
          className="
            lg:col-span-4
            rounded-xl
            bg-[#FFF5E4]
            p-5
            space-y-4
            text-sm
          "
        >
          <h4 className="font-semibold text-black">
            ¿Necesitas hacer algún cambio?
          </h4>

          {[
            { step: 1, label: "Cambiar servicios" },
            { step: 2, label: "Cambiar tus datos" },
            { step: 3, label: "Cambiar fecha y hora" },
          ].map((item) => (
            <motion.button
              key={item.step}
              whileHover={{ x: 4 }}
              onClick={() => navigation.goToStep(item.step)}
              className="block text-left text-black/80 hover:underline"
            >
              {item.label}
              <div className="text-xs text-black/50">Ir a paso {item.step}</div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <motion.div
        variants={section}
        className="
          flex flex-col-reverse
          gap-4
          pt-6
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <span className="text-xs text-black/70 sm:max-w-md">
          Para confirmar tu reserva se requiere un anticipo de $20.000 COP vía
          Nequi o Bancolombia.
        </span>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigation.prevStep()}
            className="
              w-full sm:w-auto
            rounded-full border border-[#850E35]
            px-6 py-3 text-sm text-black
            hover:bg-white/40 transition cursor-pointer
            "
          >
            Volver
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleConfirm}
            className="
              w-full sm:w-auto
            rounded-full bg-[#850E35]
            px-6 py-3 text-sm font-medium text-white
            transition-all
            disabled:opacity-40 cursor-pointer
            enabled:hover:scale-[1.03]
            "
          >
            Confirmar cita y pagar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
