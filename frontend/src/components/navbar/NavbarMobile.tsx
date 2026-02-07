"use client";

import { useRef, useState } from "react";
import { Menu, X, ChevronLeft, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NAV_ITEMS, SERVICES_ITEMS } from "./header.data";
import { useCloseOnScroll, useOnClickOutside } from "./useScrollDirection";
import { useAuth } from "@/src/hooks/auth/AuthContext";
import AuthDialog from "../auth/AuthDialog";

type View = "main" | "services" | "profile";

export default function NavbarMobile() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("main");

  // ⬅️ ESTE ref ahora envuelve TODO
  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  const canAccessPanel =
    isAuthenticated && (user?.role === "WORKER" || user?.role === "ADMIN");

  const closeAll = () => {
    setOpen(false);
    setView("main");
  };

  useCloseOnScroll(closeAll);

  useOnClickOutside(containerRef, () => {
    if (open) closeAll();
  });

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => {
          if (open) closeAll();
          else setOpen(true);
        }}
        className="p-2 rounded-md hover:bg-black/5 transition text-black"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="fixed top-full left-0 w-full bg-[#ffc4c4] shadow-lg rounded-b-2xl mt-2 overflow-hidden z-50">
          <div className="relative w-full overflow-x-hidden">
            <div
              className={`
                flex w-[300%]
                transition-transform duration-300 ease-out
                ${
                  view === "main"
                    ? "translate-x-0"
                    : view === "services"
                      ? "-translate-x-1/3"
                      : "-translate-x-2/3"
                }
              `}
            >
              <div className="w-full p-6">
                <nav className="flex flex-col gap-6">
                  <button
                    onClick={() => setView("services")}
                    className="flex justify-between items-center text-base font-medium text-black"
                  >
                    Servicios
                    <span className="text-black/40">›</span>
                  </button>

                  {NAV_ITEMS.filter((i) => i.label !== "Servicios").map(
                    (item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeAll}
                        className="text-base font-medium text-black"
                      >
                        {item.label}
                      </Link>
                    ),
                  )}

                  <button
                    onClick={() => setView("profile")}
                    className="flex items-center gap-2 text-base font-medium text-black"
                  >
                    <User size={18} />
                    Perfil
                  </button>
                </nav>
              </div>

              <div className="w-full p-6">
                <button
                  onClick={() => setView("main")}
                  className="flex items-center gap-2 mb-6 text-sm text-black/70"
                >
                  <ChevronLeft size={18} />
                  Volver
                </button>

                <nav className="flex flex-col gap-4">
                  {SERVICES_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAll}
                      className="flex items-center gap-3 text-base font-medium text-black"
                    >
                      <item.icon size={18} className="text-[#850E35]" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="w-full p-6">
                <button
                  onClick={() => setView("main")}
                  className="flex items-center gap-2 mb-6 text-sm text-black/70"
                >
                  <ChevronLeft size={18} />
                  Volver
                </button>

                <div className="flex flex-col gap-4">
                  {!isAuthenticated && (
                    <AuthDialog
                      trigger={
                        <button className="text-left text-base text-black">
                          Iniciar sesión
                        </button>
                      }
                    />
                  )}

                  {canAccessPanel && (
                    <button
                      onClick={() => {
                        router.push("/admin/workerPanel");
                        closeAll();
                      }}
                      className="text-left text-base text-black"
                    >
                      Ir al panel
                    </button>
                  )}

                  {isAuthenticated && (
                    <button
                      onClick={() => {
                        logout();
                        closeAll();
                        router.push("/");
                      }}
                      className="text-left text-base text-red-600"
                    >
                      Cerrar sesión
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
