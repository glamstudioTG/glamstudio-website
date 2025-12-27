"use client";

import Image from "next/image";
import { frameOffsetGallery } from "./gallery.config";
import { FramePositionGallery, GallerySize } from "./gallery.types";
import { GalleryItem } from "./gallery.types";

interface Props {
  item: GalleryItem;
  area: string;
  framePosition: FramePositionGallery;
  size: GallerySize;
}

export function GalleryGridItem({ item, area, framePosition, size }: Props) {
  return (
    <div
      className="group relative"
      style={{ gridArea: area, width: size.width }}
    >
      {/* Aura */}
      <div
        className="
        absolute inset-0 z-0 rounded-xl
        bg-[#D4AF37]/80 blur-xl
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500
        shadow-[0_0_60px_rgba(212,175,55,0.9)]
      "
      />

      {/* Marco */}
      <div
        className={`
        absolute inset-0 z-10 rounded-xl border border-[#D4AF37]
        transition-all duration-500
        ${frameOffsetGallery[framePosition]}
        group-hover:translate-x-0 group-hover:translate-y-0
      `}
      />

      {/* Imagen */}
      <div
        className="relative z-20 overflow-hidden rounded-xl bg-white"
        style={{ height: size.height }}
      >
        <Image
          src={item.src}
          alt={item.category}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
}
