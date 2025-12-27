import Input from "./Inputs/TextInput";
import Select from "./Inputs/SelectInput";
import BookingPreview from "./bookingPreview";
import { User, Phone, Mail, Book } from "lucide-react";
import ButtonLoading from "@/src/components/ui/shadcn-io/button-loading/button-loading";

export default function BookingForm() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre completo"
          placeholder="Tu nombre"
          icon={<User className="size-5" />}
        />
        <Input
          label="Número"
          placeholder="+57 300 000 0000"
          icon={<Phone className="size-5" />}
        />
        <Input
          label="Correo electrónico"
          placeholder="correo@email.com"
          icon={<Mail className="size-5" />}
        />
        <Select label="Servicio" />
        <Input label="Fecha" type="date" />
        <Input label="Hora" type="time" />
      </div>

      <div>
        <label className="block text-sm text-[#716D6D] mb-2">
          Notas adicionales
        </label>
        <textarea
          className="w-full h-28 rounded-lg border text-black bg-[#F0DDC1] border-[#FDE68A] p-3 
            focus:outline-none focus:ring-2 focus:ring-[#D4AF37] placeholder:text-[#9E9B91]"
          placeholder="Alguna indicación especial…"
        />
      </div>

      <BookingPreview />

      <div className="flex justify-center">
        <ButtonLoading />
      </div>
    </div>
  );
}
