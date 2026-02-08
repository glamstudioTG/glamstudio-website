"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  CheckCheck,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import clsx from "clsx";
import glamLogo from "@/public/logos/glamLogo.png";
import Image from "next/image";

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
    label: "Mis horarios y bloqueos",
    href: "/admin/workerPanel/schedule-managment",
    icon: Calendar,
  },
  {
    label: "Clientes",
    href: "/workerPanel/clients",
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

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-[#faf0f3] px-4 py-6">
      <div className="mb-4 flex items-center justify-center ">
        <Link href={"/"}>
          <Image
            src={glamLogo}
            alt="glamStudio Logo"
            width={100}
            height={110}
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
              className={clsx(
                "flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition",
                isActive
                  ? "bg-pink-100 text-pink-700"
                  : "text-gray-600 hover:bg-[#FFD7D7]/30",
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link href={"/"}>
        <button className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-red-500 w-full font-bold hover:bg-red-100 cursor-pointer">
          <LogOut size={18} />
          Logout
        </button>
      </Link>
    </aside>
  );
}
