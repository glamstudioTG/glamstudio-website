"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  CheckCheck,
  ShieldCheck,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import glamLogo from "@/public/logos/glamLogo.png";

const navItems = [
  {
    label: "Reservas pendientes",
    href: "/admin/workerPanel",
    icon: CheckCheck,
  },
  {
    label: "Historial de reservas",
    href: "/admin/workerPanel/history",
    icon: LayoutDashboard,
  },
  {
    label: "Gestion de bloqueos",
    href: "/admin/workerPanel/schedule-managment",
    icon: Calendar,
  },
  {
    label: "Gestion de horario",
    href: "/admin/workerPanel/bussines-hours",
    icon: Users,
  },
  {
    label: "Admin",
    href: "/workerPanel/admin",
    icon: ShieldCheck,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        className="
          fixed top-4 left-4 
          rounded-xl bg-[#B0154E] text-white
          p-2 shadow-xl
          md:hidden
        "
      >
        <Menu size={22} />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-900 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 z-950 h-screen w-64",
          "flex flex-col border-r-2 bg-[#faf0f3] border-gray-400/20 px-4 py-6",
          "transition-transform duration-300 ease-out",
          "md:static md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
          className="absolute right-4 top-4 md:hidden text-black"
        >
          <X size={22} />
        </button>

        <div className="mb-6 flex items-center justify-center">
          <Link href="/" onClick={() => setOpen(false)}>
            <Image
              src={glamLogo}
              alt="GlamStudio Logo"
              width={100}
              height={110}
              priority
            />
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition",
                  isActive
                    ? "bg-pink-100 text-[#850E35]"
                    : "text-gray-600 hover:bg-[#FFD7D7]/30",
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/" onClick={() => setOpen(false)}>
          <button className="mt-4 flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-100">
            <LogOut size={18} />
            Logout
          </button>
        </Link>
      </aside>
    </>
  );
}
