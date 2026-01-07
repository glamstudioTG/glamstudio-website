import { Trash, Plus } from "lucide-react";
import { BookingForm, BookingService } from "../../../types/booking.types";
import { SERVICES_CATALOG } from "./ServiceCatalog";

interface ServiceListProps {
  booking: BookingForm;
}

export default function ServiceList({ booking }: ServiceListProps) {
  const baseServices = SERVICES_CATALOG.filter((s) => s.featured);

  const selectedExtraServices = booking.state.services
    .filter((selected) => !baseServices.some((base) => base.id === selected.id))
    .slice()
    .reverse();

  const visibleServices = [...selectedExtraServices, ...baseServices];

  const toggleService = (service: BookingService) => {
    const exists = booking.state.services.some((s) => s.id === service.id);

    booking.setServices(
      exists
        ? booking.state.services.filter((s) => s.id !== service.id)
        : [...booking.state.services, service]
    );
  };

  return (
    <div className="space-y-4 max-h-82.5 overflow-y-auto p-5">
      {visibleServices.map((service) => {
        const selected = booking.state.services.some(
          (s) => s.id === service.id
        );

        return (
          <button
            key={service.id}
            onClick={() => toggleService(service)}
            className="group relative w-full text-left"
          >
            <span
              className={`
                pointer-events-none absolute inset-0 rounded-xl
                bg-[#D4AF37]/70
                blur-md
                transition-opacity duration-300 ease-out
                ${selected ? "opacity-100" : "opacity-0"}
              `}
            />

            <div
              className={`
                relative z-10 grid grid-cols-[1fr_auto_auto]
                items-center gap-6
                rounded-xl px-5 py-4
                bg-[#F0DDC1]
                transition-colors duration-300 ease-out
                ${selected ? "border border-[#D4AF37]" : ""}
              `}
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
                <p className="text-xs text-black/60">{service.duration} min</p>
              </div>

              <div className="w-8 flex justify-end text-[#D4A64E]">
                {selected ? <Trash size={18} /> : <Plus size={18} />}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
