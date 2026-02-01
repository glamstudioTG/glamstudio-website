import { Eye, Sparkles, Smile, RefreshCcw, Scissors } from "lucide-react";

export const NAV_ITEMS = [
  { label: "Servicios", href: "/services" },
  { label: "Acerca de nosotros", href: "/#about" },
  { label: "Contactanos", href: "/#contact" },
  { label: "Academia", href: "/#academy" },
];

export const SERVICES_ITEMS = [
  {
    label: "Cejas",
    href: "/services#cejas",
    icon: Eye,
  },
  {
    label: "Pestañas",
    href: "/services#pestanas",
    icon: Sparkles,
  },
  {
    label: "Labios",
    href: "/services#labios",
    icon: Smile,
  },
  {
    label: "Retoques",
    href: "/services#retoques",
    icon: RefreshCcw,
  },
  {
    label: "Depilación",
    href: "/services#depilacion",
    icon: Scissors,
  },
];
