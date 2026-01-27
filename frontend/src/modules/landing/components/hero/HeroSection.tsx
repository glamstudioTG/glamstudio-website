"use client";

import { CornerAccentButton } from "@/src/components/ui/shadcn-io/corner-accent-button";
import { MagneticButton } from "@/src/components/ui/shadcn-io/magnetic-button";
import HeroImageMosaic from "./HeroImageMosaic";
import { motion, easeOut } from "framer-motion";

export default function HeroSection() {
  const textContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.4,
      },
    },
  };

  const textItem = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  };

  return (
    <>
      <section className="relative w-full min-h-210 bg-hero-gradient overflow-hidden flex items-center">
        <div className="absolute inset-0 flex right-0 top-1/2 -translate-y-1/2">
          <HeroImageMosaic />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center">
          <motion.div
            variants={textContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-10  md:col-start-2 md:pr-10"
          >
            <motion.span
              variants={textItem}
              className="text-gray-800 text-sm tracking-wide font-sans "
            >
              Estudio de belleza premium
            </motion.span>

            <motion.h1
              variants={textItem}
              className="text-4xl md:text-8xl text-black font-mono"
            >
              Redefinimos tu brillo con el arte de la belleza.
            </motion.h1>

            <motion.p variants={textItem} className="text-black font-sans">
              En GlamStudio cuidamos cada detalle para resaltar tu estilo con
              elegancia y confianza
            </motion.p>

            <motion.div
              variants={textItem}
              className="flex items-center gap-16 pt-4"
            >
              <CornerAccentButton className="cursor-pointer ">
                Reserva tu cita
              </CornerAccentButton>

              <MagneticButton className="cursor-pointer">
                Ver nuestros servicios
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
