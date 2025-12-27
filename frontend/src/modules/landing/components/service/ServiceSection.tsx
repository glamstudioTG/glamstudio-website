import CardService from "../../service/serviceSection/cardsService";
import { services } from "./service.data";
import Orb from "@/src/components/ui/shadcn-io/bgOrb/Orb";

export default function ServiceSection() {
  return (
    <section className="relative bg-[#fcf5e8] py-24 overflow-hidden">
      <div className="absolute left-0 top-[65%] w-full h-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <Orb
          hue={12}
          hoverIntensity={0.15}
          rotateOnHover={true}
          backgroundColor="#fcf5e8"
        />

        <div className="absolute inset-0 bg-[#fcf5e8]/60 " />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col gap-16">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-5xl md:text-6xl text-black font-mono">
            Servicios
          </h2>

          <p className="text-gray-700 max-w-md">
            Porque la perfección vive en cada detalle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={index % 3 === 1 ? "md:translate-y-10" : ""}
            >
              <CardService {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
