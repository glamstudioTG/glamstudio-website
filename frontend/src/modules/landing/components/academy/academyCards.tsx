import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/shadcn-io/dialog/dialog";
import { AcademyCourse } from "./academy.data";

interface Props {
  course: AcademyCourse;
}

export function getWhatsAppCourseLink(courseTitle: string) {
  const phone = "573103072274";

  const message = `
Hola, buen día.
Me gustaría recibir información detallada sobre el curso "${courseTitle}".
Quedo atento(a) a su respuesta.
Muchas gracias.
  `.trim();

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function AcademyCard({ course }: Props) {
  return (
    <div
      className="
        bg-[#FFF7F0]
        rounded-2xl
        overflow-hidden
        flex flex-col
        max-w-82.5
        transition-all
        duration-300
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]
      "
    >
      <div className="relative w-full h-60">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 px-6 py-6">
        <div className="flex items-center gap-1 text-[11px] tracking-wide text-[#B96B7A] uppercase">
          <span>{course.level}</span>
          <span>•</span>
          <span>{course.duration}</span>
        </div>

        <h3 className="text-[16px] text-[#3B1E1E] leading-snug">
          {course.title}
        </h3>

        <p className="text-sm text-[#6B5A5A] leading-relaxed">
          {course.shortDescription}
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <button
              className="
                mt-2
                text-sm
                font-medium
                cursor-pointer
                text-[#850e35]
                hover:text-[#ee6983]
                transition-colors
                self-start
              "
            >
              Ver temario completo →
            </button>
          </DialogTrigger>

          <DialogContent className="bg-[#FFEAEA]/92 border-[#ee6983]/40 max-w-2xl w-full p-0 overflow-hidden">
            <div className="px-6 pt-6 pb-4 border-b border-[#ee6983]/30">
              <DialogHeader>
                <DialogTitle className=" text-2xl text-black">
                  {course.title}
                </DialogTitle>
                <DialogDescription>
                  Información detallada del curso
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="relative max-h-[75vh] overflow-y-auto px-6 py-6 pr-3">
              <div className="space-y-4 text-sm text-gray-800">
                <div className="flex justify-between">
                  <span className="font-medium">Duración</span>
                  <span>{course.duration}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Precio</span>
                  <span>${course.price.toLocaleString("es-CO")}</span>
                </div>

                {course.modality && (
                  <div className="flex justify-between">
                    <span className="font-medium">Modalidad</span>
                    <span>{course.modality}</span>
                  </div>
                )}

                {course.location && (
                  <div className="flex justify-between">
                    <span className="font-medium">Ubicación</span>
                    <span>{course.location}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-[#ee6983]/30">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {course.fullDescription}
                  </p>
                </div>

                {course.learning && (
                  <div className="pt-4 border-t border-[#ee6983]/30">
                    <h4 className="font-semibold mb-2">Lo que aprenderás</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {course.learning.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {course.includes && (
                  <div className="pt-4 border-t border-[#ee6983]/30">
                    <h4 className="font-semibold mb-2">Incluye</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {course.includes.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {course.kit && (
                  <div className="pt-4 border-t border-[#ee6983]/30">
                    <h4 className="font-semibold mb-2">Kit profesional</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {course.kit.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <a
                  href={getWhatsAppCourseLink(course.title)}
                  target="_blank"
                  className="
                    block
                    w-full
                    text-center
                    py-3
                    rounded-lg
                    bg-[#25D366]
                    text-white
                    font-medium
                    hover:bg-[#1ebe5d]
                    transition-colors
                    mt-6
                  "
                >
                  Consultar por WhatsApp
                </a>
              </div>

              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-[#FFEAEA] to-transparent" />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
