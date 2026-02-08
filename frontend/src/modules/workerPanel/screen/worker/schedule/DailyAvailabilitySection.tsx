"use client";

import { useAuth } from "@/src/hooks/auth/AuthContext";
import { useParams } from "next/navigation";
import DashboardHeader from "../../utils/DashboardHeader";
import DailyAvailabilityList from "./components/cards/DailyAvailabilityList";
import SectionState from "../../utils/SectionState";

export default function DailyAvailabilitySection() {
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

  if (!workerId) {
    return (
      <section className="min-h-screen bg-[#fdf0f0] p-6">
        <SectionState
          variant="warning"
          title="Trabajador no seleccionado"
          description="Selecciona un trabajador para visualizar su disponibilidad."
        />
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#fdf0f0] p-6">
      <div className="mx-auto max-w-4xl">
        <DashboardHeader
          title="Disponibilidad del día"
          description="Bloqueos y horarios especiales por trabajador."
        />

        <DailyAvailabilityList workerId={workerId} />
      </div>
    </section>
  );
}
