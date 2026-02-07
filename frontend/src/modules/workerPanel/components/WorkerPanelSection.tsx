"use client";

import DashboardHeader from "./components/DashboardHeader";
import BookingFilters from "./components/BookingFilters";
import BookingList from "./components/BookingList";
import { useAuth } from "@/src/hooks/auth/AuthContext";
import { useState } from "react";
import { WorkerBookingFilters } from "../types/workerPanel.type";
import { useParams } from "next/navigation";
import PendingTransactionProofs from "./components/PendingTransactionProofs";

export default function WorkerPanelSection() {
  const { user, loading } = useAuth();
  const { workerId: workerIdParam } = useParams<{ workerId: string }>();
  const [filters, setFilters] = useState<WorkerBookingFilters>({});

  if (loading) return null;
  if (!user) return <p className="text-black">No autorizado</p>;

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
        <DashboardHeader />
        <PendingTransactionProofs workerId={workerId} />
      </div>
    </section>
  );
}
