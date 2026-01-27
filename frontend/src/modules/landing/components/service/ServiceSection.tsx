"use client";

import { motion } from "framer-motion";
import CardService from "../../service/serviceSection/cardsService";
import { services } from "./service.data";

export default function ServiceSection() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16">
        {/* HEADER */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-5xl md:text-6xl text-black font-mono">
            Servicios
          </h2>
          <p className="text-gray-700 max-w-md">
            Porque la perfección vive en cada detalle
          </p>
        </div>

        {/* CARDS */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className={index % 3 === 1 ? "md:translate-y-10" : ""}
            >
              <CardService {...service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
