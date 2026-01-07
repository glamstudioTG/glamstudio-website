import eyelashes from "@/public/images/landing/eyelashes.png";
import eyebrows from "@/public/images/landing/eyebrows.png";
import lips from "@/public/images/landing/lips.png";
import retouching from "@/public/images/landing/retouching.png";
import skin from "@/public/images/landing/lastSavedSkin.png";
import depilation from "@/public/images/landing/depilation.png";

export const services = [
  {
    title: "Pestañas",
    price: "Desde $70.000",
    href: "/services#pestanas",
    description: "Realce de pestañas suave y natural.",
    image: eyelashes,
    framePosition: "top-left",
  },
  {
    title: "Cejas",
    price: "Desde $25.000",
    href: "/services#cejas",
    description: "Cejas de aspecto natural diseñadas con arte y precisión.",
    image: eyebrows,
    framePosition: "top-center",
  },
  {
    title: "Labios",
    price: "Desde $200.000",
    href: "/services#labios",
    description: "Color sutil, belleza duradera.",
    image: lips,
    framePosition: "top-right",
  },
  {
    title: "Retoques",
    price: "Desde $25.000",
    href: "/services#retoques",
    description: "Mantén tu color vibrante y preciso.",
    image: retouching,
    framePosition: "bottom-left",
  },
  {
    title: "Cuidado posterior",
    price: "Incluido con tu tratamiento",
    description: "Guía profesional para prolongar los resultados.",
    image: skin,
    framePosition: "bottom-center",
  },
  {
    title: "Depilación",
    price: "Desde $7.000",
    href: "/services#depilacion",
    description: "Mantén tu esencia con una depilación suave.",
    image: depilation,
    framePosition: "bottom-right",
  },
];
