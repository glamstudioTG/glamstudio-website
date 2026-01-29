"use client";

import { StepProps } from "../../types/booking.types";
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

export default function StepUserInfo({ booking, navigation }: StepProps) {
  const user = booking.state.userInfo ?? {
    name: "",
    email: "",
    phone: "",
    note: "",
  };
  const nameValid = user.name.trim().length > 0;
  const emailValid = isValidEmail(user.email);
  const phoneValid = isValidPhone(user.phone);

  const isValid = nameValid && emailValid && phoneValid;

  const handleNext = () => {
    if (!isValid) return;
    navigation.nextStep();
  };

  return (
    <div className="rounded-xl bg-[#EDB9B9] p-8 space-y-6">
      <StepHeader title="Tus detalles" step={2} icon={User} />

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-black/70">
            <label>Nombre completo</label>
            <span>Requerido</span>
          </div>

          <InputGroup>
            <InputGroupInput
              aria-invalid={!nameValid}
              value={user.name}
              onChange={(e) =>
                booking.setUserInfo({ ...user, name: e.target.value })
              }
              placeholder="Tatiana Gomez"
              className="text-black "
            />
            <InputGroupAddon className="text-[#850E35]">
              <User />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-black/70">
            <label>Correo</label>
            <span className="italic">Perdemos enviar confirmaciones aquí</span>
          </div>

          <InputGroup>
            <InputGroupInput
              aria-invalid={user.email !== "" && !emailValid}
              type="email"
              value={user.email}
              onChange={(e) =>
                booking.setUserInfo({ ...user, email: e.target.value })
              }
              placeholder="tatianagomez@gmail.com"
              className="text-black"
            />
            <InputGroupAddon className="text-[#850E35]">
              <MailIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="col-span-2 space-y-1.5">
          <div className="flex justify-between text-xs text-black/70">
            <label>Número</label>
            <span>Requerido</span>
          </div>

          <InputGroup>
            <InputGroupInput
              aria-invalid={user.phone !== "" && !phoneValid}
              value={user.phone}
              onChange={(e) =>
                booking.setUserInfo({ ...user, phone: e.target.value })
              }
              placeholder="Ingresa un número de teléfono válido"
              className="text-black"
            />
            <InputGroupAddon className="text-[#850E35]">
              <PhoneCall />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="col-span-2 space-y-1.5">
          <div className="flex justify-between text-xs text-black/70">
            <label>Notas para tu especialista</label>
            <span className="italic">¿Hay algo que debamos saber?</span>
          </div>

          <InputGroup>
            <InputGroupTextarea
              value={user.note}
              onChange={(e) =>
                booking.setUserInfo({ ...user, note: e.target.value })
              }
              placeholder="Ej. Preferencias de estilos, sensibilidad, detalles de acceso"
              className="text-black"
            />
            <InputGroupAddon align="block-end">
              <InputGroupText className="text-xs text-black/50">
                {120 - (user.note?.length ?? 0)} caracteres
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          className="rounded-full border border-[#850E35] px-6 py-2 text-sm text-black cursor-pointer"
          onClick={navigation.prevStep}
        >
          Volver a fecha y hora
        </button>

        <button
          disabled={!isValid}
          onClick={handleNext}
          className="rounded-full bg-[#850E35] px-6 py-2 text-sm font-medium text-white disabled:opacity-40 cursor-pointer"
        >
          Siguiente: Servicios
        </button>
      </div>
    </div>
  );
}
