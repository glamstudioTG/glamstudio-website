import { StaticImageData } from "next/dist/shared/lib/image-external";
import academyImage from "../../../../../public/images/landing/academiImage5.jpeg";
import academyImage2 from "../../../../../public/images/landing/academiImage2.jpeg";
import academyImage3 from "../../../../../public/images/landing/academiImage3.jpeg";
import academyImage4 from "../../../../../public/images/landing/academiImage4.jpeg";

import academyImage6 from "../../../../../public/images/landing/academyImage6.jpeg";
export interface AcademyCourse {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  price: number;
  level: string;
  image: string | StaticImageData;

  modality?: string;
  location?: string;
  includes?: string[];
  learning?: string[];
  kit?: string[];
}

export const academyCourses: AcademyCourse[] = [
  {
    id: "combo-completo-lashes",
    title: "COMBO COMPLETO DE PESTAÑAS",
    shortDescription:
      "Aprende desde cero técnicas clásicas, volumen e híbridas con práctica real y kit profesional incluido.",

    fullDescription:
      "Este programa intensivo está diseñado para personas sin experiencia que desean formarse profesionalmente en extensiones de pestañas. Durante el curso aprenderás técnicas clásicas, volumen e híbridas, junto con los diseños más solicitados en el mercado como ojo de gato, ardilla y muñeca.\n\nTambién dominarás efectos modernos como pestañina, húmedo y tecnológicos, además de fundamentos clave como bioseguridad, anatomía ocular, crecimiento de las pestañas, manejo profesional de materiales y prevención de riesgos.\n\nIncluye práctica guiada, acompañamiento personalizado y un kit profesional completo para que puedas iniciar de inmediato en el mundo laboral.",

    duration: "5 días (4 horas por día)",

    price: 1200000,

    level: "Desde cero",

    modality: "Presencial y personalizado",

    location: "Villavicencio - Conjunto Ciudad Salitre, Av Catama",

    includes: [
      "Guía digital completa",
      "Certificación en técnicas clásicas y volumen artesanal",
      "Certificación en fibras tecnológicas",
      "Mini refrigerio durante los 5 días",
      "Guías de entrenamiento",
      "Kit profesional completo",
    ],

    learning: [
      "Técnicas: clásica, volumen e híbridas",
      "Diseños: ojo de gato, ardilla y muñeca",
      "Efectos: pestañina, húmedo y tecnológicos",
      "Bioseguridad y gestión de riesgos",
      "Anatomía ocular",
      "Ciclo de crecimiento de las pestañas",
      "Uso profesional de materiales",
      "Tricología básica",
      "Porosidad del vello",
      "Riesgos oculares",
      "Polimerización de adhesivos",
    ],

    kit: [
      "Maniquí de práctica",
      "Pestañas de práctica",
      "Cajas de pestañas 0.07 y 0.15",
      "Fibras tecnológicas",
      "Cepillos (x50) y aplicadores (x50)",
      "Shampoo profesional 250ml",
      "Parches de hidrogel (x20)",
      "Primer y booster",
      "Adhesivo profesional Lady Black",
      "Removedor",
      "Cintas (Transpore y Micropore)",
      "Anillos (x100)",
      "Ventilador y espejos",
      "Pinza L y pinza de aislamiento",
      "Dispensador de agua",
    ],

    image: academyImage,
  },
  {
    id: "henna-brows",

    title: "Cejas en henna desde cero",

    shortDescription:
      "Aprende diseño, visagismo y aplicación de henna para lograr cejas definidas, naturales y duraderas.",

    fullDescription:
      "Este curso está enfocado en enseñarte desde cero el diseño profesional de cejas con henna. Aprenderás a analizar el rostro, definir la forma ideal de cejas y aplicar correctamente la henna para lograr resultados naturales y duraderos.\n\nIncluye práctica guiada, materiales durante la clase y acompañamiento para que puedas comenzar a ofrecer este servicio de forma profesional.",

    duration: "1 día (6 horas)",

    price: 300000,

    level: "Desde cero",

    learning: [
      "Visajismo: identificación de la forma ideal de ceja según el rostro",
      "Aplicación correcta de henna paso a paso",
      "Técnicas de depilación con cera",
      "Diseño profesional de cejas",
    ],

    includes: [
      "Henna en dos tonos (castaño claro y oscuro)",
      "Set de brochas para cejas",
      "Lápiz de cera",
      "Hilo hindú",
      "Depilador",
      "Regla pie de rey",
      "Cera para práctica de depilación",
      "Guías de entrenamiento",
      "Certificado de participación",
    ],

    image: academyImage2,
  },
  {
    id: "hidralips",
    title: "Hidralips 🇧🇷",
    shortDescription:
      "Técnica brasileña de hidratación profunda para labios suaves y revitalizados.",
    fullDescription:
      "Hidralips es una técnica avanzada de hidratación labial que mejora textura, color natural y apariencia saludable. En este curso aprenderás protocolos, productos adecuados, aplicación segura y recomendaciones post tratamiento.",
    duration: "1 día (6 horas)",
    price: 650000,
    level: "Especializado",
    image: academyImage3,
  },
  {
    id: "lash-lifting",
    title: "Lifting de pestañas y laminado de cejas",
    shortDescription:
      "Realza las pestañas naturales elevándolas desde la raíz sin extensiones.",
    fullDescription:
      "Curso práctico donde aprenderás a realizar lifting de pestañas con resultados duraderos y naturales. Incluye tipos de moldes, tiempos, productos, seguridad y finalización profesional.",
    duration: "1 día (6 horas)",
    price: 450000,
    level: "Profesional",
    image: academyImage4,
  },
  {
    id: "combo-estandar-lashes",

    title: "COMBO ESTÁNDAR DE PESTAÑAS",

    shortDescription:
      "Aprende técnicas clásicas, volumen e híbridas con formación completa y kit básico para iniciar en el mundo profesional.",

    fullDescription:
      "Este curso intensivo está diseñado para personas que desean iniciar desde cero en el mundo de las extensiones de pestañas. Aprenderás técnicas clásicas, volumen e híbridas, junto con diseños como ojo de gato, ardilla y muñeca.\n\nTambién adquirirás conocimientos fundamentales en bioseguridad, anatomía ocular, crecimiento de las pestañas y uso correcto de materiales profesionales.\n\nIncluye acompañamiento personalizado, certificación y un kit básico ideal para comenzar tu práctica profesional.",

    duration: "5 días (4 horas por día)",

    price: 850000,

    level: "Desde cero",

    modality: "Presencial y personalizado",

    location: "Villavicencio - Conjunto Ciudad Salitre, Av Catama",

    learning: [
      "Técnicas: clásica, volumen e híbridas",
      "Diseños: ojo de gato, ardilla y muñeca",
      "Efectos: pestañina, húmedo y tecnológicos",
      "Bioseguridad y gestión de riesgos",
      "Anatomía ocular",
      "Ciclo de crecimiento de las pestañas",
      "Uso profesional de materiales",
      "Tricología básica",
      "Porosidad del vello",
      "Riesgos oculares",
      "Polimerización de adhesivos",
    ],

    includes: [
      "Guía digital completa",
      "Certificación en técnicas clásicas y volumen artesanal",
      "Guías de entrenamiento",
      "Kit básico de trabajo",
    ],

    kit: [
      "Maniquí de práctica",
      "Pestañas de práctica",
      "Cajas de pestañas 0.07 y 0.15",
      "Cepillos (x50) y aplicadores (x50)",
      "Shampoo",
      "Parches de hidrogel (x12)",
      "Adhesivo profesional Lady Black",
      "Removedor",
      "Cinta Transpore",
      "Anillos (x100)",
      "Pinza L y pinza de aislamiento",
      "Dispensador de agua",
    ],

    image: academyImage6,
  },
];
