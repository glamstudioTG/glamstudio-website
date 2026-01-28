import AcademyCard from "./academyCards";
import { academyCourses } from "./academy.data";
import clsx from "clsx";
import AcademyCTASection from "./AcademyCTASection";

export default function AcademySection() {
  const total = academyCourses.length;
  const remainder = total % 3;

  return (
    <section className="py-24 bg-[#FFEAEA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-xl mx-auto gap-6 mb-20">
          <span className="text-[10px] bg-[#ee6983]/40 px-3 py-1 rounded-md font-semibold text-black">
            GLAMSTUDIO ACADEMY
          </span>

          <h2 className="text-black text-4xl md:text-5xl font-mono leading-tight">
            Formamos a las futuras expertas en belleza profesional
          </h2>

          <p className="text-gray-600 text-sm md:text-base">
            Capacítate con técnicas actuales, acompañamiento profesional y una
            formación pensada para impulsar tu carrera en el mundo de la
            belleza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-18">
          {academyCourses.map((course, index) => {
            const isLastRow = index >= total - remainder;
            const isSingle = remainder === 1;
            const isDouble = remainder === 2;

            return (
              <div
                key={course.id}
                className={clsx(
                  "flex justify-center",
                  isLastRow && isSingle && "md:col-span-3",
                  isLastRow && isDouble && "md:col-span-3 md:flex md:gap-8",
                )}
              >
                <div className="w-full max-w-90">
                  <AcademyCard course={course} />
                </div>
              </div>
            );
          })}
        </div>
        <AcademyCTASection />
      </div>
    </section>
  );
}
