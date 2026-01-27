"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HeroSection from "../../components/hero/HeroSection";
import ServiceSection from "../../components/service/ServiceSection";

export default function HeroServiceScene() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Overlay MÁS PEQUEÑO (como pediste)
  const overlayY = useTransform(scrollYProgress, [0.05, 0.25], ["100%", "0%"]);

  return (
    <section ref={ref} className="relative">
      {/* ESCENA HERO */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <HeroSection />

        {/* OVERLAY PARCIAL */}
        <motion.div
          style={{ y: overlayY }}
          className="absolute inset-0 bg-[#FFEAEA] z-10"
        />
      </div>

      {/* SERVICE REAL — FLUJO NORMAL */}
      <div className="relative bg-[#FFEAEA]">
        <ServiceSection />
      </div>
    </section>
  );
}
