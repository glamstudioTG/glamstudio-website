"use client";

import DashboardHeader from "../../utils/DashboardHeader";
import { useAuth } from "@/src/hooks/auth/AuthContext";
import { useParams } from "next/navigation";
import HistoryList from "./components/HistoryList";

export default function HistorySection() {
  const { user, loading } = useAuth();
  const { workerId: workerIdParam } = useParams<{ workerId: string }>();

  if (loading) return null;
  if (!user) return <p>No autorizado</p>;

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
