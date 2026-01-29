"use client";

import { motion } from "framer-motion";
import { CategoryTypesData } from "../types";
import { CornerAccentButton } from "@/src/components/ui/shadcn-io/corner-accent-button";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/src/components/ui/shadcn-io/accordion/accordion";
import ServiceItem from "./ServiceItem";
import Image from "next/image";
import imageProof from "../../../../../public/images/galery/cejasHenna.jpg";
import { Button } from "@/src/components/ui/shadcn-io/shimmerButton/button";
import { Eye, EyeClosed } from "lucide-react";
import { itemFadeUp } from "../../hooks/animations/animations";
import { useState } from "react";

type Props = {
  category: CategoryTypesData;
  direction: "normal" | "reverse";
};

export default function ServiceCategoryCard({ category, direction }: Props) {
  const isReversed = direction === "reverse";
  const [open, setOpen] = useState<string | undefined>(undefined);

  const isOpen = open === "services";
  const toggle = () => setOpen(open === "services" ? undefined : "services");

  return (
    <motion.div
      variants={itemFadeUp}
      initial="initial"
      whileInView="enter"
      exit="exit"
      viewport={{ amount: 0.3 }}
      className="bg-[#FFD7D7] rounded-xl p-6 md:p-10 shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div
          className={`flex justify-center${
            isReversed ? "md:order-2 justify-end" : "md:order-1 justify-start"
          }`}
        >
          <div className="relative w-44 h-64 md:w-59.25 md:h-78.75 m-auto">
            <div
              className={`
                absolute inset-0 border-2 border-[#850E35] rounded-lg
                ${isReversed ? "-translate-x-1.5" : "translate-x-1.5"}
                translate-y-1.5
              `}
            />
            <Image
              src={imageProof}
              alt={category.name}
              width={237}
              height={343}
              className="rounded-lg object-cover relative z-10 "
            />
          </div>
        </div>

        <div
          className={`
            text-center md:text-left
            md:${isReversed ? "order-1" : "order-2"}
          `}
        >
          <h3 className="font-mono text-5xl md:text-5xl text-black mb-4">
            {category.name}
          </h3>
          <p className="text-gray-700 max-w-md mx-auto md:mx-0">
            {category.description}
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4 md:gap-8 justify-center md:justify-start">
            <CornerAccentButton
              accentColor="bg-[#E3D4BF] cursor-pointer min-w-]"
              className="cursor-pointer min-w-50"
            >
              Reservar ahora
            </CornerAccentButton>

            <Button
              onClick={toggle}
              variant="ghost"
              className="text-black hover:bg-[#850E35]/30 min-h-12.25 max-w-40 flex gap-2 cursor-pointer m-auto"
            >
              <span
                className={`
                inline-flex items-center justify-center
                transition-all duration-300 ease-in-out
                ${
                  isOpen
                    ? "scale-y-75 rotate-360 opacity-70"
                    : "scale-y-100 rotate-0"
                }
                `}
              >
                {isOpen ? <EyeClosed size={24} /> : <Eye size={24} />}
              </span>
              <span className="text-sm">
                {isOpen ? "Ocultar técnicas" : "Ver técnicas"}
              </span>
            </Button>
          </div>
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        value={open}
        onValueChange={setOpen}
        className="mt-6"
      >
        <AccordionItem value="services">
          <AccordionContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-10"
            >
              <div className="h-px w-full bg-[#850E35] mb-6" />

              <div className="grid grid-cols-1 gap-6">
                {category.services.map((service) => (
                  <ServiceItem key={service.id} service={service} />
                ))}
              </div>
            </motion.div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}
