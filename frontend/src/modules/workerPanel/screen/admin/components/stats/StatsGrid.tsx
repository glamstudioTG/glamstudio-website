import { Calendar, AlertCircle, DollarSign, Users } from "lucide-react";
import { StatCard } from "./StatCard";

interface StatsRowProps {
  today: number;
  pending: number;
  income: number;
  workers: number;
}

export function StatsRow({ today, pending, income, workers }: StatsRowProps) {
  return (
    <div className="flex gap-4 w-full flex-col sm:flex-row lg:flex-nowrap max-w-255 m-auto">
      <StatCard
        title="Reservas Hoy"
        value={today}
        variant="today"
        icon={Calendar}
      />

      <StatCard
        title="Pendientes Revisión"
        value={pending}
        variant="pending"
        icon={AlertCircle}
      />

      <StatCard
        title="Ingresos (Mes)"
        value={`$${income.toLocaleString()}`}
        variant="income"
        icon={DollarSign}
      />

      <StatCard
        title="Trabajadores Activos"
        value={workers}
        variant="workers"
        icon={Users}
      />
    </div>
  );
}
