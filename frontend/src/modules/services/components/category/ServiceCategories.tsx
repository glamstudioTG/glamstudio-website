"use client";

import { motion } from "framer-motion";
import { categoriesMock } from "./category.data";
import ServiceCategoryCard from "./ServiceCategoryCard";
import { itemFadeUp } from "../../hooks/animations/animations";

export default function ServiceCategories() {
  return (
    <div className="flex flex-col gap-24 md:gap-36 relative">
      {categoriesMock.map((category, index) => {
        const isEven = index % 2 === 0;

        return (
          <motion.div
            key={category.id}
            variants={itemFadeUp}
            initial="initial"
            whileInView="enter"
            exit="exit"
            viewport={{ amount: 0.3 }}
            className={`relative flex ${
              isEven ? "justify-start" : "justify-end"
            }`}
          >
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`
                pointer-events-none absolute top-1/2
                -translate-y-1/2
                w-[90%] h-[60%]
                md:w-[80%] md:h-[80%]
                rounded-[48px]
                blur-[70px]
                md:blur-[90px]
                bg-[#EE6983]/60
                left-1/2 -translate-x-1/2
                md:${isEven ? "-left-40" : "-right-40"}
              `}
            />

            <div
              className={`
                pointer-events-none absolute
                top-8
                ${isEven ? "right-110 top-15" : "left-110 top-15"}
                w-[65%] h-[98%]
                border-2 border-[#850E35]/60
                rounded-2xl
                z-0
              `}
            />

            {/* 🧱 CONTENIDO REAL */}
            <div className="relative z-10 max-w-4xl w-full">
              <ServiceCategoryCard
                category={category}
                direction={isEven ? "normal" : "reverse"}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
