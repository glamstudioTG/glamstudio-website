"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { UploadCloud, AlertCircle } from "lucide-react";
import { StepProps } from "../../../types/booking.types";
import StepHeader from "../../../service/StepUtils/StepHeader";
import nequi from "@/public/images/landing/nequi.svg";
import { CopyButton } from "@/src/components/animate-ui/components/buttons/copy";

export default function StepPaymentProof({ booking, navigation }: StepProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewUrl = useMemo(() => {
    if (!booking.paymentProof) return null;
    return URL.createObjectURL(booking.paymentProof);
  }, [booking.paymentProof]);

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="
        mx-auto max-w-5xl
        rounded-xl bg-[#EDB9B9]
        p-6 md:p-8 space-y-6
      "
    >
      <StepHeader
        step={5}
        title="Confirmación de anticipo"
        icon={UploadCloud}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-yellow-50 p-4 flex gap-3 text-sm text-black">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              <strong>Atención requerida.</strong> El comprobante del anticipo
              debe enviarse en un máximo de{" "}
              <strong className="text-red-600">30 minutos</strong>. Si no se
              recibe dentro de este tiempo, la reserva será cancelada
              automáticamente.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-black">
                Instrucciones de pago
              </h4>
              <p className="text-xs text-black/60">
                Para confirmar tu cita, es necesario realizar el pago del
                anticipo.
              </p>
            </div>

            <div
              className="
                rounded-xl bg-[#F8EDEE]
                border border-[#E8C7D0]
                p-4 sm:p-5
                flex items-center gap-4 justify-between
            "
            >
              <div className="flex">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-black/60">
                    Enviar anticipo únicamente a:
                  </p>

                  <div className="shrink-0 flex flex-row gap-2">
                    <img
                      src={nequi.src}
                      alt="Nequi"
                      className="h-10 w-10 rounded-lg"
                    />
                    <p className="text-lg font-bold text-black tracking-wide justify-center items-center pt-2">
                      312&nbsp;272&nbsp;4820
                    </p>
                  </div>

                  <p className="mt-1 flex items-center gap-1 text-xs text-black/50">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Este número es único para pagos. No se aceptan otros
                    métodos.
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <CopyButton
                  content="3122724820"
                  variant="outline"
                  size="sm"
                  className="
                  cursor-pointer
                  bg-transparent
                border-[#D99AB6]
                text-[#850E35]
                hover:bg-[#FDEAF2]
            "
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-black">
                Subir comprobante
              </p>

              <div
                onClick={handleClickUpload}
                className="
                  cursor-pointer
                  rounded-xl border border-dashed border-[#850E35]/40
                  bg-[#FDFBF9]
                  p-8 text-center space-y-3
                  transition hover:bg-[#fde9e9]
                "
              >
                <UploadCloud className="mx-auto h-8 w-8 text-[#850E35]" />

                <p className="text-sm text-black/70">
                  Arrastra tu imagen aquí o{" "}
                  <span className="font-medium text-[#850E35] underline">
                    haz clic para buscar
                  </span>
                </p>

                <p className="text-xs text-black/50">
                  Soporta JPG y PNG (Máx 5MB)
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      booking.setPaymentProof(file);
                    }
                  }}
                />
                {previewUrl && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={previewUrl}
                      alt="Preview comprobante"
                      className="
        max-h-48
        rounded-lg
        border border-[#850E35]/30
        shadow-sm
      "
                    />
                  </div>
                )}
              </div>

              {booking.booking?.paymentProof && (
                <p className="text-xs text-green-700">
                  Comprobante cargado correctamente
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl bg-white p-6 space-y-4 text-sm">
            <h4 className="font-semibold text-black">Resumen de tu cita</h4>

            <div className="space-y-2 text-black/70">
              <div className="flex justify-between">
                <span>Fecha</span>
                <span>{booking.state.date?.toLocaleDateString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Hora</span>
                <span>{booking.state.time}</span>
              </div>

              <div className="flex justify-between">
                <span>Servicio</span>
                <span className="text-right">
                  {booking.state.services.map((s) => s.name).join(", ")}
                </span>
              </div>
            </div>

            <div className="border-t pt-3 flex justify-between font-medium text-black">
              <span>Anticipo a pagar</span>
              <span className="text-[#D99AB6] font-black">$20.000</span>
            </div>
          </div>

          {/* RECOMENDACIONES */}
          <div className="rounded-xl bg-[#FDEAF2] p-5 space-y-2 text-xs text-black/70">
            <p>• Llegar 10 minutos antes de tu hora programada.</p>
            <p>• Asistir sin maquillaje en la zona a tratar.</p>
            <p>• Evitar cremas o aceites faciales el día de la cita.</p>
            <p>• Informar alergias o condiciones especiales previamente.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between pt-4">
        <button
          onClick={navigation.prevStep}
          className="
            rounded-full border border-[#850E35]
            px-6 py-2 text-sm text-black
          "
        >
          Volver
        </button>

        <button
          disabled={!booking.paymentProof}
          className="
            rounded-full bg-[#850E35]
            px-6 py-2 text-sm font-medium text-white
            disabled:opacity-40
          "
        >
          Enviar comprobante y confirmar reserva
        </button>
      </div>
    </motion.div>
  );
}
