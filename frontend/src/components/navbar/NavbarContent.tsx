"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { NAV_ITEMS, SERVICES_ITEMS } from "./header.data";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/src/components/ui/shadcn-io/popover/popover";
import { useCloseOnScroll } from "./useScrollDirection";
import { scrollToId } from "@/lib/scrollToId";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/auth/AuthContext";
import AuthDialog from "../auth/AuthDialog";

export default function NavbarContent() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const router = useRouter();

  const { isAuthenticated, user, logout } = useAuth();

  const canAccessPanel =
    isAuthenticated && (user?.role === "WORKER" || user?.role === "ADMIN");

  useCloseOnScroll(() => {
    setServicesOpen(false);
    setProfileOpen(false);
  });

  return (
    <nav className="flex items-center gap-10">
      <Popover open={servicesOpen} onOpenChange={setServicesOpen}>
        <PopoverTrigger asChild>
          <button className="text-sm font-medium text-black/80 hover:text-black transition cursor-pointer">
            Servicios
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={12}
          className="w-56 bg-[#ffc4c4] border-[#850e35]/40 rounded-xl p-3"
        >
          <ul className="flex flex-col gap-1">
            {SERVICES_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      router.push("/services");
                      setTimeout(() => {
                        scrollToId("cejas");
                      }, 50);
                    }}
                    className="
                      group flex items-center gap-3
                      rounded-lg px-3 py-2
                      text-sm text-black/80
                      hover:bg-[#fff5e4]/40 hover:text-black
                      transition-all
                    "
                  >
                    <Icon
                      size={16}
                      className="
                        text-[#850e35]
                        transition-transform duration-200
                        group-hover:translate-x-0.5
                      "
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </PopoverContent>
      </Popover>

      {NAV_ITEMS.filter((i) => i.label !== "Servicios").map((item) => (
        <Link
          key={item.href}
          onClick={() => {
            scrollToId("cejas");
            setServicesOpen(false);
          }}
          href={item.href}
          className="text-sm font-medium text-black/80 hover:text-black transition"
        >
          {item.label}
        </Link>
      ))}

      <Popover open={profileOpen} onOpenChange={setProfileOpen}>
        <PopoverTrigger asChild>
          <button
            className="
              ml-2 flex items-center justify-center
              h-9 w-9 rounded-full
              cursor-pointer
              border border-[#850e35]/40
              hover:bg-[#ee6983]/20
              transition
            "
          >
            <User size={18} className="text-black" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          sideOffset={12}
          className="w-44 bg-[#ffc4c4] border-[#850e35]/40 p-3 rounded-xl"
        >
          {!isAuthenticated && (
            <AuthDialog
              trigger={
                <button
                  className="
            w-full text-left rounded-md px-3 py-2 text-sm
            text-black/80 hover:bg-[#fff5e4]/15 hover:text-black
            transition cursor-pointer
          "
                >
                  Iniciar sesión
                </button>
              }
            />
          )}

          {canAccessPanel && (
            <button
              onClick={() => {
                router.push("/admin/workerPanel");
                setProfileOpen(false);
              }}
              className="
      w-full text-left rounded-md px-3 py-2 text-sm
      text-black/80 hover:bg-[#fff5e4]/15 hover:text-black
      transition cursor-pointer
    "
            >
              Ir al panel
            </button>
          )}

          {isAuthenticated && (
            <button
              onClick={() => {
                logout();
                setProfileOpen(false);
                router.push("/");
              }}
              className="
        w-full text-left rounded-md px-3 py-2 text-sm
        text-black/80 hover:bg-red-500/10 hover:text-red-600
        transition cursor-pointer
      "
            >
              Cerrar sesión
            </button>
          )}
        </PopoverContent>
      </Popover>
    </nav>
  );
}
