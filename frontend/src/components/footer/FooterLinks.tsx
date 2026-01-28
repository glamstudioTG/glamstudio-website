import Link from "next/link";
import { footerLinks } from "./footer.config";
import Shuffle from "../ui/shadcn-io/shuffle";

export default function FooterLinks() {
  return (
    <div className="z-10">
      <h4 className="text-black font-semibold mb-4 z-10">Quick links</h4>
      <ul className="space-y-2">
        {footerLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[#000000] hover:text-[#850E35] transition"
            >
              <Shuffle text={link.label} className="text-" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
