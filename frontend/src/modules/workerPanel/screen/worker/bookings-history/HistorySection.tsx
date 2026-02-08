"use client";

import DashboardHeader from "../../utils/DashboardHeader";
import { useAuth } from "@/src/hooks/auth/AuthContext";
import { useParams } from "next/navigation";
import HistoryList from "./components/HistoryList";
import SectionState from "../../utils/SectionState";

export default function HistorySection() {
  const { user, loading } = useAuth();
  const { workerId: workerIdParam } = useParams<{ workerId: string }>();

  if (loading) {
    return (
      <section className="min-h-screen bg-[#fdf0f0] p-6">
        <SectionState
          title="Cargando disponibilidad…"
          description="Estamos preparando la información del trabajador."
        />
      </section>
    );
  }
  if (!user) {
    return (
      <section className="min-h-screen bg-[#fdf0f0] p-6">
        <SectionState
          variant="error"
          title="Acceso no autorizado"
          description="Debes iniciar sesión para ver la disponibilidad del trabajador."
        />
      </section>
    );
  }

  const workerId =
    user.role === "WORKER" ? user.workerId : (workerIdParam ?? null);

  if (!workerId) return <p>Selecciona un trabajador</p>;

  return (
    <section className="min-h-screen bg-[#fdf0f0] p-6">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader
          title="Historial de reservas"
          description="Controla tus reservas y observa el pasado de ellas."
        />
        <HistoryList workerId={workerId} />
      </div>
    </section>
  );
}
