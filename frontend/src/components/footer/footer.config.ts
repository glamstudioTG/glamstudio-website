export const footerLinks = [
  { label: "Servicios", href: "#service" },
  { label: "Galería", href: "#gallery" },
  { label: "Contáctanos", href: "#contact" },
  { label: "Acerca de nosotros", href: "#about" },
];

const message = encodeURIComponent(
  "Hola, quiero más información sobre sus servicios y disponibilidad. ¡Gracias!.",
);

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/glamstudiotg?igsh=em1jNjg0OTFkd3px",
    icon: "instagram",
  },
  { label: "Facebook", href: "#", icon: "facebook" },
  {
    label: "WhatsApp",
    href: `https://wa.me/573122724820?text=${message}`,
    icon: "whatsapp",
  },
];
