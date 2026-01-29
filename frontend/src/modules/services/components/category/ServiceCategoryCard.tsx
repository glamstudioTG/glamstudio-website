"use client";

import { useState } from "react";
import Image from "next/image";
import { CategoryTypesData } from "../types";
import { CornerAccentButton } from "@/src/components/ui/shadcn-io/corner-accent-button";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/src/components/ui/shadcn-io/accordion/accordion";
import ServiceItem from "./ServiceItem";
import imageProof from "../../../../../public/images/galery/cejasHenna.jpg";
import { Button } from "@/src/components/ui/shadcn-io/shimmerButton/button";
import { Eye, EyeClosed } from "lucide-react";

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
    <div className="bg-[#FFD7D7] rounded-xl p-6 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <div
          className={`flex ${
            isReversed ? "md:order-2 justify-end" : "md:order-1 justify-start"
          }`}
        >
          <div className="relative w-59.25 h-78.75">
            <div
              className={`absolute inset-0 border-2 border-[#D4AF37] rounded-lg
                ${
                  isReversed
                    ? "-translate-x-1.5 translate-y-1.5"
                    : "translate-x-1.5 translate-y-1.5"
                }
              `}
            />
            <Image
              src={imageProof}
              alt={category.name}
              width={237}
              height={343}
              className="rounded-lg relative z-10"
            />
          </div>
        </div>

        <div
          className={`text-center ${isReversed ? "md:order-1" : "md:order-2"}`}
        >
          <h3 className="font-mono text-5xl mb-4 text-black">
            {category.name}
          </h3>
          <p className="text-gray-700">{category.description}</p>

          <div className="mt-10 grid grid-cols-2 gap-10">
            <CornerAccentButton accentColor="bg-[#E3D4BF]">
              Reservar ahora
            </CornerAccentButton>

            <Button
              onClick={toggle}
              variant="ghost"
              className="text-black hover:bg-[#D4AF37]/30 min-h-12.25 max-w-40 flex gap-2"
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
            <div className="mt-10 h-px w-full bg-[#D4AF37] mb-6" />
            <div className="grid grid-cols-1 gap-6 p-6 rounded-xl">
              {category.services.map((service) => (
                <ServiceItem key={service.id} service={service} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
