export type FramePositionGallery =
  | "top-left"
  | "top-right"
  | "center-left"
  | "center-right"
  | "top-center"
  | "bottom-center"
  | "bottom-left"
  | "bottom-right";

export type GalleryCategory = "pestañas" | "cejas" | "labios";

export interface GalleryItem {
  id: number;
  category: GalleryCategory;
  src: string;
}

export interface GallerySize {
  width: number;
  height: number;
}
