"use client";

import { CornerAccentButton } from "@/src/components/ui/shadcn-io/corner-accent-button";
import { MagneticButton } from "@/src/components/ui/shadcn-io/magnetic-button";
import HeroImageMosaic from "./HeroImageMosaic";
import { motion, easeOut } from "framer-motion";
import Link from "next/link";

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
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  return (
    <section
      className="
        relative isolate w-full
        h-svh md:min-h-screen
        bg-hero-gradient
        overflow-x-hidden
      "
    >
      <div className="md:hidden h-full flex flex-col">
        <div className="flex-[0.55] flex items-end justify-center">
          <HeroImageMosaic scale="mobile" />
        </div>

        <motion.div
          variants={textContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="
            flex-[0.45]
            flex flex-col gap-4
            text-center
            px-6
          "
        >
          <motion.span variants={textItem} className="text-xs text-gray-800">
            Estudio de belleza premium
          </motion.span>

          <motion.h1
            variants={textItem}
            className="text-4xl font-mono text-black leading-tight"
          >
            Redefinimos tu brillo con el arte de la belleza.
          </motion.h1>

          <motion.p
            variants={textItem}
            className="text-sm text-black max-w-md mx-auto"
          >
            En GlamStudio cuidamos cada detalle para resaltar tu estilo con
            elegancia y confianza
          </motion.p>

          <motion.div variants={textItem} className="flex flex-col gap-3 pt-2">
            <CornerAccentButton className="w-full">
              Reserva tu cita
            </CornerAccentButton>

            <MagneticButton className="w-full">
              Ver nuestros servicios
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <div className="hidden md:grid relative z-10 max-w-8xl mx-auto w-full grid-cols-2 items-center px-0">
        <motion.div
          variants={textContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="md:col-start-2 md:pr-10 md:mt-40 flex flex-col gap-6"
        >
          <motion.span variants={textItem} className="text-sm text-gray-800">
            Estudio de belleza premium
          </motion.span>

          <motion.h1
            variants={textItem}
            className="text-8xl font-mono text-black leading-tight"
          >
            Redefinimos tu brillo con el arte de la belleza.
          </motion.h1>

          <motion.p
            variants={textItem}
            className="text-base text-black max-w-md"
          >
            En GlamStudio cuidamos cada detalle para resaltar tu estilo con
            elegancia y confianza
          </motion.p>

          <motion.div
            variants={textItem}
            className="flex items-center gap-4 pt-2"
          >
            <Link href={"/booking"}>
              <CornerAccentButton className=" text-center cursor-pointer">
                Reserva tu cita
              </CornerAccentButton>
            </Link>
            <Link href={"/services"}>
              <MagneticButton className="cursor-pointer">
                Ver nuestros servicios
              </MagneticButton>
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 right-0 top-1/2 -translate-y-1/2 flex">
          <HeroImageMosaic scale="desktop" />
        </div>
      </div>
    </section>
  );
}
