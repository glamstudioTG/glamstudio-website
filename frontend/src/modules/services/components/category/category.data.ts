import { CategoryTypesData } from "../types";

export const categoriesMock: CategoryTypesData[] = [
  {
    id: "cat-cejas",
    name: "Cejas",
    description:
      "Eleva tu mirada con pestañas que añaden volumen, profundidad y un toque de sofisticación.",
    image: "../../../../../public/images/galery/cejasHenna.jpg",
    services: [
      {
        id: "srv-1",
        name: "Laminación de cejas",
        description:
          "Peinado y fijación semipermanente que ordena, da volumen y estiliza las cejas para un efecto pulido y moderno.",
        image: "/images/galery/cejasHenna.jpg",
        duration: 60,
        price: 90000,
        categoryId: "cat-cejas",
      },
    ],
  },
  {
    id: "cat-labios",
    name: "Labios",
    description:
      "Refresca tus resultados y mantén tu look impecable con un retoque rápido y profesional.",
    image: "../../../../../public/images/galery/cejasHenna.jpg",
    services: [
      {
        id: "srv-2",
        name: "Color natural labios",
        description:
          "Peinado y fijación semipermanente que ordena, da volumen y estiliza las cejas para un efecto pulido y moderno.",
        image: "/images/galery/cejasHenna.jpg",
        duration: 90,
        price: 130000,
        categoryId: "cat-labios",
      },
    ],
  },
];
