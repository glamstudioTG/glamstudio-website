import CardService from "../../service/serviceSection/cardsService";
import { services } from "./service.data";
import LightRays from "@/src/components/ui/shadcn-io/lightRigts/LightRays";

export default function ServiceSection() {
  return (
    <section className="relative bg-[#FFEFD3] py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#D4AF37"
          raysSpeed={1}
          lightSpread={0.3}
          rayLength={3}
          fadeDistance={1}
          saturation={1}
          followMouse={true}
          mouseInfluence={0.05}
        />

        <div className="absolute inset-0 bg-[#FFEFD3]/85" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
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
