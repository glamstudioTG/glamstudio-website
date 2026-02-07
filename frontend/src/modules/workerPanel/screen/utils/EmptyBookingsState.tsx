import { CalendarX } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
};

export default function EmptyBookingsState({
  title = "No hay reservas",
  description = "Cuando tengas nuevas reservas, aparecerán aquí para que puedas gestionarlas.",
}: Props) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-dashed border-[#E5B8B8] bg-[#FFEAEA] px-6 py-12 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD7D7]">
        <CalendarX className="h-6 w-6 text-[#850E35]" />
      </div>

      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>
    </div>
  );
}
