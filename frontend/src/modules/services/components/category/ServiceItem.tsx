import { Service } from "../../types/category.types";
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
import Link from "next/link";

type Props = {
  service: Service;
};

const formtatMinutes = (minutes: number) => {
  if (!minutes || minutes <= 0) return "0 min";

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) return `${remainingMinutes} min`;
  if (remainingMinutes === 0) return `${hours} horas`;

  return `${hours} h ${remainingMinutes} min`;
};

export default function ServiceItem({ service }: Props) {
  return (
    <div
      className="flex flex-col md:flex-row
        gap-6 md:gap-10
        bg-[#FFF5E4]
        rounded-lg
        p-6 md:px-10 md:py-8
        shadow-sm"
    >
      <div className="flex-1 w-full h-full text-center md:mt-14">
        <h2 className="font-mono text-3xl md:text-5xl text-black mb-2">
          {service.name}
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed max-w-112.5">
          {service.description}
        </p>
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center  items-center">
          <Link href={""}>
            <ShimmerButton className="w-full md:w-auto bg-[#850E35] text-white cursor-pointer">
              Solicitar esta técnica
            </ShimmerButton>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/50 cursor-pointer "
              >
                <CircleAlert className="text-[#850E35]" size={80} />
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-[#FFF5E4]/95 border-[#850E35]">
              <DialogHeader>
                <DialogTitle className="font-mono text-xl text-black">
                  Información de la técnica
                </DialogTitle>
                <DialogDescription className="text-gray-700">
                  Detalles importantes antes de reservar.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-4 text-sm text-gray-800">
                <div className="flex justify-between">
                  <span className="font-medium">Duración</span>
                  <span>{formtatMinutes(service.duration)} </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Precio</span>
                  <span>${service.price.toLocaleString()}</span>
                </div>

                <div className="pt-4 border-t border-[#850E35]/40">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative w-52.5 h-75 shrink-0 m-auto">
        <div className="absolute inset-0 border-2  border-[#850E35] rounded-lg -translate-x-1.5 translate-y-1.5 z-0" />
        <Image
          src={service.image ?? "/images/placeholder.jpg"}
          alt={service.name}
          fill
          className="rounded-lg object-cover relative z-10"
        />
      </div>
    </div>
  );
}
