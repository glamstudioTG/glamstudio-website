import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Service {
  id: string;
  name: string;
  description?: string;
  duration: number;
  price: number;
  image?: string | StaticImport | undefined;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string | StaticImport | undefined;
  services: Service[];
}
