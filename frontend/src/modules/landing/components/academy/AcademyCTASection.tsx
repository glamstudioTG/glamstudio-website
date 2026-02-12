import { Button } from "@/src/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function AcademyCTASection() {
  return (
    <section className="">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm px-8 py-16 text-center flex flex-col items-center gap-6">
          <h3 className="text-3xl md:text-4xl font-mono text-[#850e35]">
            ¿Lista para comenzar tu carrera?
          </h3>

          <p className="text-gray-600 max-w-xl text-sm md:text-base leading-relaxed">
            Te asesoramos personalmente para elegir el curso que mejor se adapte
            a tus objetivos. Recibe el dossier completo y precios escribiéndonos
            directo.
          </p>

          <Button
            asChild
            className="mt-4 bg-[#8E4B5D] hover:bg-[#7a3f4f] text-white px-8 py-6 rounded-md text-sm font-medium flex items-center gap-2"
          >
            <a
              href="https://wa.me/573103072274?text=Hola%2C%20buen%20día.%20Me%20interesa%20recibir%20información%20detallada%20sobre%20los%20cursos%20disponibles%20en%20GlamStudio%20Academy.%20Quedo%20atento%20a%20su%20respuesta.%20Muchas%20gracias."
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} />
              Consultar cursos por WhatsApp
            </a>
          </Button>

          <div className="flex items-center gap-6 text-xs text-gray-500 mt-4">
            <span className="flex items-center gap-2">
              ✓ Respuesta inmediata
            </span>
            <span className="flex items-center gap-2">
              ✓ Cupos limitados por curso
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
