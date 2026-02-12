"use client";

import { useAuth } from "@/src/hooks/auth/AuthContext";
import { useBusinessHours } from "./hooks/useBusinessHours";
import BusinessHoursEmptyState from "./components/BusinessHoursEmptyState";
import BusinessHoursList from "./components/BusinessHoursList";
import SectionState from "../../utils/SectionState";
import BussinesHoursHeader from "./components/bussinesHoursHeader";

export default function BusinessHoursSection() {
  const { user, loading: authLoading } = useAuth();

  const workerId = user?.workerId ?? null;

  const { data, isLoading } = useBusinessHours(workerId ?? "");

  if (isLoading) {
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

  if (authLoading || isLoading) {
    return <p className="text-sm text-gray-500">Cargando horarios…</p>;
  }

  if (!workerId) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-700">
          Este usuario no tiene un trabajador asociado.
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <BusinessHoursEmptyState workerId={workerId} />;
  }

  return (
    <section className="flex flex-col justify-center  ">
      <BussinesHoursHeader workerId={workerId} />
      <BusinessHoursList workerId={workerId} items={data} />
    </section>
  );
}
