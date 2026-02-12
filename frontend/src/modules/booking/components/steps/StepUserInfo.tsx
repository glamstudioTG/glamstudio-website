"use client";

import { useEffect } from "react";
import { motion, easeOut, easeInOut } from "framer-motion";
import { StepProps, BookingDraft } from "../../types/booking.types";
import StepHeader from "../../service/StepUtils/StepHeader";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupTextarea,
  InputGroupText,
} from "@/src/components/ui/shadcn-io/input/input-group";
import { MailIcon, User, PhoneCall } from "lucide-react";
import {
  isValidEmail,
  isValidPhone,
} from "../../service/serviceErrorUserInputs";
import { useAuth } from "@/src/hooks/auth/AuthContext";

const containerVariants = {
  initial: { opacity: 0, y: 24 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: easeOut,
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.3, ease: easeInOut },
  },
};

const fieldVariants = {
  idle: { x: 0, opacity: 1 },
  error: {
    x: [0, -6, 6, -4, 4, 0],
    transition: { duration: 0.35 },
  },
};

export default function StepUserInfo({
  booking,
  navigation,
}: StepProps<BookingDraft>) {
  const draftUser = booking.state.userInfo ?? {
    name: "",
    email: "",
    phone: "",
    note: "",
  };

  useEffect(() => {
    navigation.setContext(booking.state);
  }, [booking.state]);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    booking.setUserInfo({
      id: user.id,
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      note: "",
    });
  }, [user]);

  const nameValid = draftUser.name.trim().length > 0;
  const emailValid = isValidEmail(draftUser.email ?? "");
  const phoneValid = isValidPhone(draftUser.phone);
  const isValid = nameValid && emailValid && phoneValid;

  const handleNext = () => {
    if (!isValid) return;
    navigation.nextStep();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="
        rounded-xl bg-[#EDB9B9]
        p-5 sm:p-6 md:p-8
        space-y-6
      "
    >
      <StepHeader title="Tus detalles" step={2} icon={User} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <motion.div
          initial={false}
          animate={!nameValid && draftUser.name ? "error" : "idle"}
          variants={fieldVariants}
          className="space-y-1.5"
        >
          <div className="flex justify-between text-xs text-black/70">
            <label>Nombre completo</label>
            <span>Requerido</span>
          </div>

          <InputGroup>
            <InputGroupInput
              value={draftUser.name}
              aria-invalid={!nameValid}
              onChange={(e) =>
                booking.setUserInfo({ ...draftUser, name: e.target.value })
              }
              placeholder="Tatiana Gomez"
              className="text-black"
            />
            <InputGroupAddon className="text-[#850E35]">
              <User />
            </InputGroupAddon>
          </InputGroup>
        </motion.div>

        <motion.div
          initial={false}
          animate={draftUser.email && !emailValid ? "error" : "idle"}
          variants={fieldVariants}
          className="space-y-1.5"
        >
          <div className="flex justify-between text-xs text-black/70">
            <label>Correo</label>
            <span className="italic hidden sm:inline">
              Enviamos confirmaciones aquí
            </span>
          </div>

          <InputGroup>
            <InputGroupInput
              type="email"
              value={draftUser.email}
              aria-invalid={draftUser.email !== "" && !emailValid}
              onChange={(e) =>
                booking.setUserInfo({ ...draftUser, email: e.target.value })
              }
              placeholder="correo@email.com"
              className="text-black"
            />
            <InputGroupAddon className="text-[#850E35]">
              <MailIcon />
            </InputGroupAddon>
          </InputGroup>
        </motion.div>

        <motion.div
          initial={false}
          animate={draftUser.phone && !phoneValid ? "error" : "idle"}
          variants={fieldVariants}
          className="md:col-span-2 space-y-1.5"
        >
          <div className="flex justify-between text-xs text-black/70">
            <label>Número</label>
            <span>Requerido</span>
          </div>

          <InputGroup>
            <InputGroupInput
              value={draftUser.phone}
              aria-invalid={draftUser.phone !== "" && !phoneValid}
              onChange={(e) =>
                booking.setUserInfo({ ...draftUser, phone: e.target.value })
              }
              placeholder="Número de teléfono"
              className="text-black"
            />
            <InputGroupAddon className="text-[#850E35]">
              <PhoneCall />
            </InputGroupAddon>
          </InputGroup>
        </motion.div>

        <motion.div
          variants={fieldVariants}
          className="md:col-span-2 space-y-1.5"
        >
          <div className="flex justify-between text-xs text-black/70">
            <label>Notas para tu especialista</label>
            <span className="italic">Opcional</span>
          </div>

          <InputGroup>
            <InputGroupTextarea
              value={draftUser.note}
              onChange={(e) =>
                booking.setUserInfo({ ...draftUser, note: e.target.value })
              }
              placeholder="Preferencias, sensibilidad, detalles especiales"
              className="text-black min-h-24"
            />
            <InputGroupAddon align="block-end">
              <InputGroupText className="text-xs text-black/50">
                {120 - (draftUser.note?.length ?? 0)} caracteres
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </motion.div>
      </div>

      <motion.div
        variants={fieldVariants}
        className="
          flex flex-col-reverse gap-3 pt-4
          sm:flex-row sm:justify-between
          md:justify-end md:gap-4
        "
      >
        <button
          onClick={navigation.prevStep}
          className="
            w-full sm:w-auto
            rounded-full border border-[#850E35]
            px-6 py-3 text-sm text-black
            hover:bg-white/40 transition cursor-pointer
          "
        >
          Volver
        </button>

        <button
          disabled={!isValid}
          onClick={handleNext}
          className="
            w-full sm:w-auto
            rounded-full bg-[#850E35]
            px-6 py-3 text-sm font-medium text-white
            transition-all
            disabled:opacity-40 cursor-pointer
            enabled:hover:scale-[1.03]
          "
        >
          Siguiente
        </button>
      </motion.div>
    </motion.div>
  );
}
