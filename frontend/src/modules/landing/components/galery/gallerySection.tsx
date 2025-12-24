"use client";

import { useState } from "react";
import galleryItems from "./gallery.data";
import { buildGallery } from "../../service/gallery/gallery.utils";
import { GalleryCategory } from "./gallery.types";

import {
  AREA_KEYS,
  AREA_SIZE,
  AREA_FRAME_POSITION,
  filtersGalery,
} from "./gallery.config";

import { GalleryGridItem } from "./galleryGridItem";

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<"todo" | GalleryCategory>(
    "todo"
  );

  const gallery = buildGallery(galleryItems, activeFilter);

  return (
    <section className="py-24 bg-[#FFEFD3]">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-5xl md:text-6xl font-mono text-black">
            Nuestra Galería
          </h2>
          <p className="text-[#696464] mt-4">
            Experimenta el arte de la transformación
          </p>
        </header>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {filtersGalery.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                px-5 py-2 rounded-full text-sm transition-all
                ${
                  activeFilter === filter
                    ? "bg-[#D4AF37] text-black shadow-md cursor-pointer"
                    : "bg-[#FDE68A]/70 text-[#696464] hover:bg-[#D4AF37] cursor-pointer"
                }
              `}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div
          className="grid gap-6 justify-center "
          style={{
            gridTemplateColumns: "214px 277px 214px",
            gridTemplateAreas: `
              "a b c"
              "d b e"
              "f g h"
              "i g j"
            `,
          }}
        >
          {gallery.map((item, index) => {
            const area = AREA_KEYS[index];

            return (
              <GalleryGridItem
                key={item.id}
                item={item}
                area={area}
                size={AREA_SIZE[area]}
                framePosition={AREA_FRAME_POSITION[area]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
