import { StaticImageData } from "next/image";

export type FramePosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export interface CardServiceProps {
  title: string;
  price: string;
  description: string;
  image: StaticImageData | string;
  framePosition: FramePosition | string;
  href?: string;
}
