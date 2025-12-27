import { GalleryCategory, FramePositionGallery } from "./gallery.types";

export const filtersGalery: Array<"todo" | GalleryCategory> = [
  "todo",
  "pestañas",
  "cejas",
  "labios",
];

export const AREA_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

export const AREA_FRAME_POSITION: Record<string, FramePositionGallery> = {
  a: "top-left",
  b: "top-center",
  c: "top-right",
  d: "center-left",
  e: "center-right",
  f: "center-left",
  g: "bottom-center",
  h: "center-right",
  i: "bottom-left",
  j: "bottom-right",
};

export const AREA_SIZE: Record<string, { width: number; height: number }> = {
  a: { width: 214, height: 200 },
  b: { width: 277, height: 400 },
  c: { width: 214, height: 200 },

  d: { width: 214, height: 200 },
  e: { width: 214, height: 200 },

  f: { width: 214, height: 200 },
  g: { width: 277, height: 400 },
  h: { width: 214, height: 200 },

  i: { width: 214, height: 200 },
  j: { width: 214, height: 200 },
};

export const frameOffsetGallery: Record<FramePositionGallery, string> = {
  "top-left": "-translate-x-2 -translate-y-2",
  "top-right": "translate-x-2 -translate-y-2",
  "top-center": "-translate-y-2",

  "center-left": "-translate-x-2",
  "center-right": "translate-x-2",

  "bottom-left": "-translate-x-2 translate-y-2",
  "bottom-right": "translate-x-2 translate-y-2",
  "bottom-center": "translate-y-2",
};
