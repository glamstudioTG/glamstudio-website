import heroImage from "@/public/images/landing/hero.png";
import { CornerAccentButton } from "@/src/components/ui/shadcn-io/corner-accent-button";
import { MagneticButton } from "@/src/components/ui/shadcn-io/magnetic-button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      <section className="relative w-full min-h-150 bg-[#E5B997] overflow-hidden flex items-center">
        <div className="absolute inset-0 flex justify-end">
          <div className="relative w-1/2 h-full ">
            <Image
              src={heroImage}
              alt="Hero Image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div
            className="
        absolute top-0 left-1/2
        h-full w-80
        -translate-x-1/2
        bg-linear-to-r from-[#E5B997] 
      "
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="flex flex-col gap-6 max-w-md">
            <span className="text-gray-500 text-sm tracking-wide font-sans">
              Estudio de belleza premium
            </span>

            <h1 className="text-4xl md:text-7xl text-black font-mono">
              Redefinimos tu brillo con el arte de la belleza.
            </h1>

            <p className="text-black font-sans">
              En GlamStudio cuidamos cada detalle para resaltar tu estilo con
              elegancia y confianza
            </p>

            <div className="flex items-center gap-10 pt-4">
              <CornerAccentButton className="cursor-pointer">
                Reserva tu cita
              </CornerAccentButton>

              <MagneticButton className="cursor-pointer">
                Ver nuestros servicios
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
