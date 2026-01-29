"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "@/public/logos/IMG_2865-removebg-preview 4-1.png";
import NavbarContent from "./NavbarContent";
import NavbarMobile from "./NavbarMobile";
import { useScrollDirection } from "./useScrollDirection";

export default function Navbar() {
  const scrollDir = useScrollDirection();

  const isHidden = scrollDir === "down";

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={false}
      animate={{
        y: isHidden ? -100 : 0,
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <motion.div
          animate={{
            scale: isHidden ? 0.92 : 1,
            paddingTop: isHidden ? "0.75rem" : "1rem",
            paddingBottom: isHidden ? "0.75rem" : "1rem",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="
            hidden md:flex items-center justify-between
            rounded-full px-8
            bg-[#ffc4c4]/40
            backdrop-blur-md
            shadow-[0_8px_30px_rgba(0,0,0,0.06)]
            border border-white/20
          "
        >
          <Link href={"/"}>
            <Image src={Logo} alt="Glam Studio" width={120} height={40} />
          </Link>
          <NavbarContent />
        </motion.div>

        <motion.div
          animate={{
            scale: isHidden ? 0.95 : 1,
          }}
          transition={{ duration: 0.25 }}
          className="
            flex md:hidden items-center justify-between
            rounded-full px-6 py-3
            bg-[#ffc4c4]/40
            backdrop-blur-md
            shadow-md
            border border-white/20
          "
        >
          <Link href={"/"}>
            <Image src={Logo} alt="Glam Studio" width={100} height={32} />
          </Link>
          <NavbarMobile />
        </motion.div>
      </div>
    </motion.header>
  );
}
