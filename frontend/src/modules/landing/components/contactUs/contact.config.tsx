import { MapPin, Phone, Mail } from "lucide-react";
import { ContactInfoItem } from "./types";

export const contactInfo: ContactInfoItem[] = [
  {
    icon: <MapPin size={18} />,
    title: "Ubicación",
    description: "Ciudad salitre",
    subDescription: "Villavicencio, Colombia",
  },
  {
    icon: <Phone size={18} />,
    title: "Teléfono",
    description: "+57 310 3072274",
  },
  {
    icon: <Mail size={18} />,
    title: "Correo",
    description: "cuentaoficialltatiana@gmail.com",
  },
];
