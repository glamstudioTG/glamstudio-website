import Image from "next/image";
import FooterLinks from "./FooterLinks";
import FooterSocial from "./footerSocial";
import logoGlam from "@/public/logos/IMG_2865-removebg-preview 4-1.png";

export default function Footer() {
  return (
    <footer className="relative bg-[#f9dfdf] overflow-hidden pt-16">
      {/* <div
        className="
  absolute top-0 left-0 w-full h-68 pointer-events-none
  bg-linear-to-b from-[#fcf5e8] via-[#fcf5e8]/80 to-transparent
"
      /> */}
      <div className="max-w-6xl mx-auto border-t border-[#850E35] z-10" />

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 items-start z-10">
        <div className="space-y-4">
          <Image src={logoGlam} alt="GlamStudio" width={140} height={40} />
          <p className="text-sm text-[#716D6D] max-w-xs">
            Servicios profesionales de cejas y pestañas para la mujer moderna.
          </p>
        </div>

        <FooterLinks />

        <FooterSocial />
      </div>

      <div className="max-w-6xl mx-auto border-t border-[#850E35]" />

      <div className="text-center text-sm text-[#716D6D] py-6">
        © 2026 Esteban Catañeda. All rights reserved.
      </div>
    </footer>
  );
}
