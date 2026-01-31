import { BookingService } from "../../../types/booking.types";
import { BookingWorker } from "@/src/modules/booking/types/booking.types";

export const WORKERS: BookingWorker[] = [
  {
    id: "w1",
    name: "Ana Rodríguez",
    services: ["1", "2", "3", "4", "5"],
  },
  {
    id: "w2",
    name: "Laura Gómez",
    services: ["1", "3", "5"],
  },
  {
    id: "w3",
    name: "Camila Torres",
    services: ["2", "4"],
  },
];

export const SERVICES_CATALOG: BookingService[] = [
  {
    id: "1",
    name: "Pestañas pelo a pelo",
    description: "Fibra por pestaña para un look natural y definido",
    price: 70000,
    duration: 40,
    featured: true,
  },
  {
    id: "2",
    name: "Laminación de cejas",
    description: "Definición y fijación de cejas",
    price: 200000,
    duration: 60,
    featured: true,
  },
  {
    id: "3",
    name: "Diseño de cejas",
    description: "Perfilado profesional",
    price: 50000,
    duration: 30,
    featured: true,
  },
  {
    id: "4",
    name: "Tinte de cejas",
    description: "Color uniforme",
    price: 60000,
    duration: 25,
  },
  {
    id: "5",
    name: "Lifting de pestañas",
    description: "Curvatura natural",
    price: 120000,
    duration: 60,
  },
];
