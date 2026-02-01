"use client";

import { motion, easeOut, easeInOut } from "framer-motion";
import AcademyCard from "./academyCards";
import { academyCourses } from "./academy.data";
import AcademyCTASection from "./AcademyCTASection";
import clsx from "clsx";

const headerVariants = {
  initial: {
    opacity: 0,
    y: 32,
    filter: "blur(6px)",
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: 16,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: easeInOut },
  },
};

const cardVariants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.3, ease: easeInOut },
  },
};

export default function AcademySection() {
  const total = academyCourses.length;
  const remainder = total % 3;

  return (
    <section className="py-24 bg-[#FFEAEA]" id="academy">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={headerVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          onViewportEnter={(e) =>
            e?.target && e.target.setAttribute("data-view", "in")
          }
          onViewportLeave={(e) =>
            e?.target && e.target.setAttribute("data-view", "out")
          }
          viewport={{ amount: 0.6 }}
          className="flex flex-col items-center text-center max-w-xl mx-auto gap-6 mb-20"
        >
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 justify-items-center">
          {academyCourses.map((course, index) => {
            const isLastRow = index >= total - remainder;
            const isSingle = remainder === 1;
            const isDouble = remainder === 2;

            return (
              <motion.div
                key={course.id}
                variants={cardVariants}
                initial="initial"
                whileInView="enter"
                exit="exit"
                viewport={{ amount: 0.35 }}
                className={clsx(
                  "flex justify-center",
                  isLastRow && isSingle && "md:col-span-3",
                  isLastRow && isDouble && "md:col-span-3",
                )}
              >
                <div className="w-full max-w-sm md:max-w-90">
                  <AcademyCard course={course} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <AcademyCTASection />
      </div>
    </section>
  );
}
