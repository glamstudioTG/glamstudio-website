import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { socialLinks } from "./footer.config";

const icons = {
  instagram: Instagram,
  facebook: Facebook,
  whatsapp: MessageCircle,
};

export default function FooterSocial() {
  return (
    <div className="z-10">
      <h4 className="text-[#C2A85D] font-semibold mb-4 z-10">Follow us</h4>
      <div className="flex gap-4">
        {socialLinks.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons];
          return (
            <a
              key={item.label}
              href={item.href}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FDE68A] text-[#C2A85D] hover:opacity-80 transition"
              aria-label={item.label}
            >
              <Icon size={18} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
