"use client";

import DashboardHeader from "../../utils/DashboardHeader";
import { useAuth } from "@/src/hooks/auth/AuthContext";
import { useState } from "react";
import { WorkerBookingFilters } from "../../../types/workerPanel.type";
import { useParams } from "next/navigation";
import PendingTransactionProofs from "./components/PendingTransactionProofs";
import SectionState from "../../utils/SectionState";

export default function WorkerPanelSection() {
  const { user, loading } = useAuth();
  const { workerId: workerIdParam } = useParams<{ workerId: string }>();
  const [filters, setFilters] = useState<WorkerBookingFilters>({});

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

  let workerId: string | null = null;

  if (user.role === "WORKER") {
    workerId = user.workerId;
  }

  if (user.role === "ADMIN") {
    workerId = workerIdParam ?? null;
  }

  if (!workerId) {
    return <p className="text-black">Selecciona un trabajador</p>;
  }

  return (
    <section className="min-h-screen bg-[#fdf0f0] p-6">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader
          title="Reservas"
          description="Gestionar citas y verificar pagos."
        />
        <PendingTransactionProofs workerId={workerId} />
      </div>
    </section>
  );
}
