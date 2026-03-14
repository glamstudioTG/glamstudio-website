"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  workerName?: string;
  onClose: () => void;
};

export default function BookingConfirmationModal({
  open,
  workerName,
  onClose,
}: Props) {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    router.push("/");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
              w-full max-w-md
              rounded-2xl bg-white p-6 border-2 border-[#850E35]
              text-center space-y-4
            "
          >
            <CheckCircle className="mx-auto h-12 w-12 text-green-600" />

            <h3 className="text-lg font-semibold text-black">
              Reserva en revisión
            </h3>

            <p className="text-sm text-black/70 space-y-2">
              Tu comprobante fue enviado correctamente.
              <br />
              Nuestro equipo revisará el pago y confirmará tu cita en breve.
              <br />
              Recibirás un correo cuando{" "}
              <strong>{workerName ?? "el trabajador"}</strong> confirme tu cita.
            </p>

            <p className="text-xs text-black/50 bg-[#F8F8F8] p-3 rounded-lg">
              El anticipo enviado corresponde a la reserva de tu espacio en
              agenda. Una vez registrado el comprobante, este valor no es
              reembolsable.
            </p>

            <button
              onClick={handleClose}
              className="
                mt-4 w-full rounded-full
                bg-[#850E35] px-4 py-2
                text-sm font-medium text-white
                transition hover:scale-[1.02] cursor-pointer
              "
            >
              Entendido
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
