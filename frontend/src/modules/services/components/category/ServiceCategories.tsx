"use client";

import { motion, useInView } from "framer-motion";
import { useCategories } from "../../hooks/useCategories";
import { useRef } from "react";
import ServiceCategoryCard from "./ServiceCategoryCard";
import { itemFadeUp } from "../../hooks/animations/animations";
import { Category } from "../../types/category.types";
import ServiceCategorySkeleton from "./serviceCategoriesSkeleton";

function AnimatedItem({
  category,
  isEven,
}: {
  category: Category;
  isEven: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(ref, {
    margin: "-100px",
    once: false,
  });

  return (
    <motion.div
      ref={ref}
      variants={itemFadeUp}
      initial="initial"
      animate={isInView ? "enter" : "initial"}
      className={`relative flex ${isEven ? "justify-start" : "justify-end"}`}
    >
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
        }
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

      <div className="relative z-10 max-w-4xl w-full">
        <ServiceCategoryCard
          category={category}
          direction={isEven ? "normal" : "reverse"}
        />
      </div>
    </motion.div>
  );
}

export default function ServiceCategories() {
  const { data, isError, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-24 md:gap-36 relative">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`relative flex ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <ServiceCategorySkeleton
              direction={i % 2 === 0 ? "normal" : "reverse"}
            />
          </div>
        ))}
      </div>
    );
  }
  if (isError || !data) return <p>Error cargando servicios</p>;

  return (
    <div className="flex flex-col gap-24 md:gap-36 relative">
      {data.map((category, index) => (
        <AnimatedItem
          key={category.id}
          category={category}
          isEven={index % 2 === 0}
        />
      ))}
    </div>
  );
}
