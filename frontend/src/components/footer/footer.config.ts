export const footerLinks = [
  { label: "Servicios", href: "#service" },
  { label: "Galería", href: "#gallery" },
  { label: "Contáctanos", href: "#contact" },
  { label: "Acerca de nosotros", href: "#about" },
];

const message = encodeURIComponent(
  "Hola, quiero más información sobre sus servicios y disponibilidad. ¡Gracias!."
);

export const socialLinks = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
  {
    label: "WhatsApp",
    href: `https://wa.me/573144455235?text=${message}`,
    icon: "whatsapp",
  },
];
