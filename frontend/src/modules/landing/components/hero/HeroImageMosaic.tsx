"use client";

import leftTop from "@/public/images/landing/hero-2/top-left.png";
import centerTop from "@/public/images/landing/hero-2/top-center.png";
import leftCenter from "@/public/images/landing/hero-2/center-left.png";
import centerCenter from "@/public/images/landing/hero-2/center-center.png";
import rightCenter from "@/public/images/landing/hero-2/center-right.png";
import leftBottom from "@/public/images/landing/hero-2/bottom-left.png";
import rightBottom from "@/public/images/landing/hero-2/bottom-right.png";
import centerBottom from "@/public/images/landing/hero-2/bottom-center.png";
import Image from "next/image";
import { motion, easeOut, delay } from "framer-motion";

const images = [
  { src: leftTop, w: 150, h: 180, top: -30, left: 68 },
  { src: centerTop, w: 180, h: 190, top: -60, left: 230 },

  { src: leftCenter, w: 170, h: 160, top: 155, left: 48 },
  { src: centerCenter, w: 190, h: 180, top: 130, left: 220 },
  { src: rightCenter, w: 128, h: 128, top: 75, left: 413 },

  { src: leftBottom, w: 140, h: 130, top: 318, left: 78 },
  { src: centerBottom, w: 185, h: 150, top: 313, left: 226 },
  { src: rightBottom, w: 150, h: 160, top: 205, left: 413 },
];

export default function HeroImageMosaic({
  scale = "desktop",
}: {
  scale?: "desktop" | "mobile";
}) {
  const maxLeft = Math.max(...images.map((img) => img.left + img.w));

  const scaleFactor = scale === "mobile" ? 0.65 : 1;

  const totalWidth = Math.max(...images.map((i) => i.left + i.w));
  const centerOffset =
    scale === "mobile" ? (280 - totalWidth * scaleFactor) / 2 : 0;

  const containerWidth = scale === "mobile" ? 280 : totalWidth;
  const offsetX =
    scale === "mobile" ? (containerWidth - totalWidth * scaleFactor) / 2 : 0;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: [-130, -20, 0],
      filter: "blur(6px)",
    },
    visible: (custom: { delay: number }) => ({
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      scale: [0.98, 1],
      transition: {
        duration: 0.5,
        ease: easeOut,
        delay: custom.delay,
      },
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className={`
        relative
        ${scale === "mobile" ? "w-70 h-90" : "w-130 h-160"}
      `}
    >
      {images.map((img, i) => {
        const delay = (maxLeft - img.left + img.w) * 0.003;

        return (
          <motion.div
            key={i}
            custom={{ delay }}
            variants={itemVariants}
            style={{
              width: img.w * scaleFactor,
              height: img.h * scaleFactor,
              top: img.top * scaleFactor,
              left: img.left * scaleFactor + offsetX,
            }}
            className="absolute overflow-hidden rounded-2xl"
          >
            <Image
              src={img.src}
              alt=""
              fill
              className="object-cover rounded-2xl"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
