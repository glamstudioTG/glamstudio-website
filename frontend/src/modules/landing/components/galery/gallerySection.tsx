"use client";

import { useState } from "react";

import galleryItems from "./gallery.data";
import { buildGallery } from "../../service/gallery/gallery.utils";
import { GalleryCategory } from "./gallery.types";
import { AnimatePresence, motion, easeOut } from "framer-motion";

import {
  AREA_KEYS,
  AREA_SIZE,
  AREA_FRAME_POSITION,
  filtersGalery,
} from "./gallery.config";

import { GalleryGridItem } from "./galleryGridItem";

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<"todo" | GalleryCategory>(
    "todo",
  );

  const gallery = buildGallery(galleryItems, activeFilter);
  const mobileItems = gallery.slice(0, 6);

  const filterContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const filterItem = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: easeOut },
    },
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#FFEAEA]"
      id="gallery"
    >
      <div className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.header
            className="text-center max-w-xl mx-auto mb-14"
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-6xl font-mono text-black">
              Nuestra Galería
            </h2>
            <p className="text-[#696464] mt-4">
              Experimenta el arte de la transformación
            </p>
          </motion.header>

          <motion.div
            className="flex justify-center gap-4 mb-12 flex-wrap"
            variants={filterContainer}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
          >
            {filtersGalery.map((filter) => (
              <motion.button
                key={filter}
                variants={filterItem}
                onClick={() => setActiveFilter(filter)}
                whileTap={{ scale: 0.95 }}
                className={`
    px-5 py-2 rounded-full text-sm transition-all
    ${
      activeFilter === filter
        ? "bg-[#ee6983] text-black shadow-md"
        : "bg-[#fff5e4]/70 text-[#696464] hover:bg-[#ffc4c4]"
    }
  `}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter + "-mobile"}
              className="md:hidden mx-auto max-w-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: "2fr 1fr",
                  gridTemplateRows: "repeat(4, 1fr)",
                  height: 520,
                }}
              >
                {mobileItems[0] && (
                  <GalleryGridItem
                    item={mobileItems[0]}
                    area="1 / 1 / 3 / 2"
                    size={{ width: 220, height: 250 }}
                    framePosition="center-left"
                    index={0}
                  />
                )}

                {mobileItems[1] && (
                  <GalleryGridItem
                    item={mobileItems[1]}
                    area="1 / 2 / 2 / 3"
                    size={{ width: 120, height: 120 }}
                    framePosition="top-right"
                    index={1}
                  />
                )}

                {mobileItems[2] && (
                  <GalleryGridItem
                    item={mobileItems[2]}
                    area="2 / 2 / 3 / 3"
                    size={{ width: 120, height: 120 }}
                    framePosition="bottom-right"
                    index={2}
                  />
                )}

                {mobileItems[3] && (
                  <GalleryGridItem
                    item={mobileItems[3]}
                    area="3 / 1 / 5 / 2"
                    size={{ width: 220, height: 250 }}
                    framePosition="center-left"
                    index={3}
                  />
                )}

                {mobileItems[4] && (
                  <GalleryGridItem
                    item={mobileItems[4]}
                    area="3 / 2 / 4 / 3"
                    size={{ width: 120, height: 120 }}
                    framePosition="top-right"
                    index={4}
                  />
                )}

                {mobileItems[5] && (
                  <GalleryGridItem
                    item={mobileItems[5]}
                    area="4 / 2 / 5 / 3"
                    size={{ width: 120, height: 120 }}
                    framePosition="bottom-right"
                    index={5}
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter + "-desktop"}
              className="hidden md:grid gap-6 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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
                    index={index}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
