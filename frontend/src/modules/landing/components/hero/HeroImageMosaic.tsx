"use client";

import leftTop from "@/public/images/landing/hero-2/top-left.png";
// import rightTop from "@/public/images/landing/hero-2/top-left.png";
import centerTop from "@/public/images/landing/hero-2/top-center.png";
import leftCenter from "@/public/images/landing/hero-2/center-left.png";
import centerCenter from "@/public/images/landing/hero-2/center-center.png";
import rightCenter from "@/public/images/landing/hero-2/center-right.png";
import leftBottom from "@/public/images/landing/hero-2/bottom-left.png";
import rightBottom from "@/public/images/landing/hero-2/bottom-right.png";
import centerBottom from "@/public/images/landing/hero-2/bottom-center.png";
import Image from "next/image";
import { motion, easeOut } from "framer-motion";

const images = [
  { src: leftTop, w: 150, h: 180, top: -18, left: 46 },
  { src: centerTop, w: 190, h: 190, top: -30, left: 200 },
  // { src: rightTop, w: 120, h: 124, top: -30, left: 394 },

  { src: leftCenter, w: 175, h: 170, top: 165, left: 31 },
  { src: centerCenter, w: 190, h: 180, top: 163, left: 210 },
  { src: rightCenter, w: 116, h: 128, top: 97, left: 404 },

  { src: leftBottom, w: 85, h: 120, top: 338, left: 138 },
  { src: centerBottom, w: 175, h: 150, top: 347, left: 226 },
  { src: rightBottom, w: 130, h: 160, top: 228, left: 403 },
];

export default function HeroImageMosaic({
  scale = "desktop",
}: {
  scale?: "desktop" | "mobile" | "tablet";
}) {
  const maxLeft = Math.max(...images.map((img) => img.left + img.w));

  const scaleFactor = scale === "mobile" ? 0.65 : scale === "tablet" ? 0.85 : 1;
  const totalWidth = Math.max(...images.map((i) => i.left + i.w));
  const centerOffset =
    scale === "mobile" ? (280 - totalWidth * scaleFactor) / 2 : 0;

  const containerWidth =
    scale === "mobile"
      ? 280
      : scale === "tablet"
        ? totalWidth * 0.9
        : totalWidth;

  const offsetX =
    scale !== "desktop" ? (containerWidth - totalWidth * scaleFactor) / 2 : 0;

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
        ${
          scale === "mobile"
            ? "w-70 h-90"
            : scale === "tablet"
              ? "w-110 h-140"
              : "w-130 h-160"
        }
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
