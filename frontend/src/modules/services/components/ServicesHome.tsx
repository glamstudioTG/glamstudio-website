"use client";

import { motion } from "framer-motion";
import ServiceCategories from "./category/ServiceCategories";
import { sectionHeader } from "../hooks/animations/animations";

export default function ServiceHome() {
  return (
    <section className="bg-[#FFEAEA] py-36 px-8 overflow-x-hidden">
      <motion.h1
        variants={sectionHeader}
        initial="initial"
        whileInView="enter"
        exit="exit"
        viewport={{ amount: 0.6 }}
        className="font-mono text-black text-5xl md:text-6xl text-center mb-24"
      >
        Nuestros Servicios
      </motion.h1>

      <ServiceCategories />
    </section>
  );
}
