"use client";

import leftTop from "@/public/images/landing/hero/top-left.png";
import centerTop from "@/public/images/landing/hero/top-center.png";
import rightTop from "@/public/images/landing/hero/top-right.png";
import leftCenter from "@/public/images/landing/hero/center-left.png";
import centerCenter from "@/public/images/landing/hero/center-center.png";
import rightCenter from "@/public/images/landing/hero/center-right.png";
import leftBottom from "@/public/images/landing/hero/bottom-left.png";
import rightBottom from "@/public/images/landing/hero/bottom-center.png";
import Image from "next/image";
import { motion, easeOut, delay } from "framer-motion";

const images = [
  { src: leftTop, w: 220, h: 290, top: -110, left: 35 },
  { src: centerTop, w: 270, h: 300, top: -117, left: 155 },
  { src: rightTop, w: 240, h: 210, top: 15, left: 368 },

  { src: leftCenter, w: 220, h: 260, top: 100, left: 10 },
  { src: centerCenter, w: 220, h: 260, top: 110, left: 205 },
  { src: rightCenter, w: 250, h: 220, top: 220, left: 368 },

  { src: leftBottom, w: 180, h: 220, top: 320, left: 35 },
  { src: rightBottom, w: 220, h: 280, top: 305, left: 205 },
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
            <Image src={img.src} alt="" fill className="object-contain" />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
