"use client";

import Image from "next/image";
import { motion, easeOut, easeInOut } from "framer-motion";
import meImage from "@/public/images/landing/4763f4ea1c606ab46ca79652a645a336 2.png";

const titleVariants = {
  initial: { opacity: 0, y: 28, filter: "blur(6px)" },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.4, ease: easeInOut },
  },
};

const textContainerVariants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const textItemVariants = {
  initial: { opacity: 0, x: -24 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
  exit: {
    opacity: 0,
    x: -12,
    transition: { duration: 0.3, ease: easeInOut },
  },
};

const imageVariants = {
  initial: { opacity: 0, x: 32, scale: 0.96 },
  enter: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
  exit: {
    opacity: 0,
    x: 16,
    scale: 0.98,
    transition: { duration: 0.4, ease: easeInOut },
  },
};

export default function AboutUsSection() {
  return (
    <section
      id="about"
      className="relative bg-[#FFEAEA] py-24 px-4 overflow-x-hidden"
    >
      {/* Marco decorativo */}
      <div className="hidden md:block absolute left-36 bottom-16 w-255.5 h-155.75 border-2 border-[#850E35] rounded-xl" />

      <div className="relative z-10 max-w-6xl mx-auto bg-[#FFD7D7] rounded-xl px-6 md:px-8 py-16 overflow-hidden">
        {/* TÍTULO */}
        <motion.h2
          variants={titleVariants}
          initial="initial"
          whileInView="enter"
          exit="exit"
          viewport={{ amount: 0.6 }}
          className="text-center font-mono text-3xl md:text-5xl text-black mb-16 max-w-2xl mx-auto"
        >
          La historia detrás de GlamStudio
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* TEXTO */}
          <motion.div
            variants={textContainerVariants}
            initial="initial"
            whileInView="enter"
            exit="exit"
            viewport={{ amount: 0.4 }}
            className="text-black text-base md:text-[18px] leading-relaxed space-y-6 md:pl-12"
          >
            {[
              "GlamStudio TG nació en 2022 del amor y la pasión de Tatiana Gómez por el mundo de la belleza.",
              "Comenzó como un emprendimiento de pestañas y hoy es un espacio de formación donde más personas pueden aprender, crecer y emprender.",
              "Nuestra misión siempre ha sido ofrecer un servicio de calidad, con dedicación en cada detalle.",
              "GlamStudio TG es más que un estudio: es la prueba de que los sueños se construyen con constancia, fe y amor.",
            ].map((text, i) => (
              <motion.p key={i} variants={textItemVariants}>
                {text}
              </motion.p>
            ))}
          </motion.div>

          {/* IMAGEN */}
          <motion.div
            variants={imageVariants}
            initial="initial"
            whileInView="enter"
            exit="exit"
            viewport={{ amount: 0.4 }}
            className="relative flex justify-center"
          >
            <div className="hidden md:block absolute right-21 bottom-1 w-80 h-96.75 border-2 border-[#850E35] rounded-xl" />

            <div className="relative z-10 rounded-xl overflow-hidden max-w-77.5 w-full">
              <Image
                src={meImage}
                alt="GlamStudio"
                width={310}
                height={387}
                className="object-cover w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
