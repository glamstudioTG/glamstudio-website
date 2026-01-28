import { StaticImageData } from "next/dist/shared/lib/image-external";
import academyImage from "../../../../../public/images/landing/depilation.png";

export interface AcademyCourse {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  price: number;
  level: string;
  image: string | StaticImageData;
}

export const academyCourses: AcademyCourse[] = [
  {
    id: "lashes-basic",
    title: "Extensiones de pestañas desde cero",
    shortDescription:
      "Domina la técnica base para crear pestañas naturales y voluminosas con acabado profesional.",
    fullDescription:
      "Este curso intensivo está diseñado para principiantes que desean aprender desde cero la técnica de extensiones de pestañas. Incluye teoría, práctica guiada, tipos de fibras, mapeo de ojos, higiene, aplicación correcta y mantenimiento. Al finalizar, la estudiante contará con las bases necesarias para iniciar su carrera profesional.",
    duration: "2 días (16 horas)",
    price: 450000,
    level: "Intensivo",
    image: academyImage,
  },
  {
    id: "henna-brows",
    title: "Cejas en henna desde cero",
    shortDescription:
      "Aprende a diseñar, medir y pigmentar cejas con henna para resultados definidos y armónicos.",
    fullDescription:
      "Curso enfocado en el diseño profesional de cejas utilizando henna. Aprenderás visagismo facial, medición correcta, elección de tonos, aplicación precisa y cuidados posteriores. Ideal para quienes desean ofrecer un servicio altamente solicitado y rentable.",
    duration: "1 día (8 horas)",
    price: 320000,
    level: "Básico",
    image: academyImage,
  },
  {
    id: "hidralips",
    title: "Hidralips 🇧🇷",
    shortDescription:
      "Técnica brasileña de hidratación profunda para labios suaves y revitalizados.",
    fullDescription:
      "Hidralips es una técnica avanzada de hidratación labial que mejora textura, color natural y apariencia saludable. En este curso aprenderás protocolos, productos adecuados, aplicación segura y recomendaciones post tratamiento.",
    duration: "1 día (6 horas)",
    price: 380000,
    level: "Especializado",
    image: academyImage,
  },
  {
    id: "lash-lifting",
    title: "Lifting de pestañas",
    shortDescription:
      "Realza las pestañas naturales elevándolas desde la raíz sin extensiones.",
    fullDescription:
      "Curso práctico donde aprenderás a realizar lifting de pestañas con resultados duraderos y naturales. Incluye tipos de moldes, tiempos, productos, seguridad y finalización profesional.",
    duration: "1 día (8 horas)",
    price: 300000,
    level: "Profesional",
    image: academyImage,
  },
];
