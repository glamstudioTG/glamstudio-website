import { ServicetypesData } from "../types";
import { ShimmerButton } from "@/src/components/ui/shimmer-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/shadcn-io/dialog/dialog";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { CircleAlert } from "lucide-react";

type Props = {
  service: ServicetypesData;
};

export default function ServiceItem({ service }: Props) {
  return (
    <div className="flex items-center gap-10 bg-[#F6E2C6] rounded-lg px-10 py-8 shadow-sm">
      <div className="flex-1 w-full h-full text-center">
        <h2 className="font-mono text-5xl text-black mb-3">{service.name}</h2>
        <p className="text-sm text-gray-700 leading-relaxed max-w-112.5">
          {service.description}
        </p>
        <div className="mt-10 flex justify-center items-center gap-8 min-h-15">
          <ShimmerButton className="bg-[#E0C49C] text-black">
            Solicitar esta técnica
          </ShimmerButton>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/30 "
              >
                <CircleAlert className="text-[#D4AF37]" size={80} />
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-[#F6E2C6] border-[#D4AF37]">
              <DialogHeader>
                <DialogTitle className="font-mono text-2xl text-black">
                  Información de la técnica
                </DialogTitle>
                <DialogDescription className="text-gray-700">
                  Detalles importantes antes de reservar.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-4 text-sm text-gray-800">
                <div className="flex justify-between">
                  <span className="font-medium">Duración</span>
                  <span>{service.duration} min</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Precio</span>
                  <span>${service.price.toLocaleString()}</span>
                </div>

                <div className="pt-4 border-t border-[#D4AF37]/40">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative w-52.5 h-75 shrink-0">
        <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-lg -translate-x-1.5 translate-y-1.5 z-0" />
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="rounded-lg object-cover relative z-10"
        />
      </div>
    </div>
  );
}
