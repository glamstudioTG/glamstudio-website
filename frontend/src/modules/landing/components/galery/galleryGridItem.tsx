"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { frameOffsetGallery } from "./gallery.config";
import { FramePositionGallery, GallerySize } from "./gallery.types";
import { GalleryItem } from "./gallery.types";

interface Props {
  item: GalleryItem;
  area: string;
  framePosition: FramePositionGallery;
  size: GallerySize;
  index: number;
}

export function GalleryGridItem({
  item,
  area,
  framePosition,
  size,
  index,
}: Props) {
  return (
    <motion.div
      className="group relative"
      style={{ gridArea: area, width: size.width }}
      initial={{
        opacity: 0,
        y: 30,
        filter: "blur(6px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.05,
      }}
    >
      <div
        className="
          absolute inset-0 z-0 rounded-xl
          bg-[#850e35]/80 blur-xl
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          shadow-[0_0_60px_rgba(212,175,55,0.9)]
        "
      />

      <div
        className={`
          absolute inset-0 z-10 rounded-xl border border-[#850e35]
          transition-all duration-500
          ${frameOffsetGallery[framePosition]}
          group-hover:translate-x-0 group-hover:translate-y-0
        `}
      />

      <div
        className="relative z-20 overflow-hidden rounded-xl bg-white"
        style={{ height: size.height }}
      >
        <Image
          src={item.src}
          alt={item.category}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
    </motion.div>
  );
}
