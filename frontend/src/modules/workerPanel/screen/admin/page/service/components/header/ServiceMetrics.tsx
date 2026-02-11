interface ServiceMetricsProps {
  totalServices: number;
  activeCategories: number;
}

export function ServiceMetrics({
  totalServices,
  activeCategories,
}: ServiceMetricsProps) {
  return (
    <div className="flex items-center gap-6">
      <MetricCard
        label="Total Servicios"
        value={totalServices}
        highlight="text-[#850E35]"
      />

      <MetricCard
        label="Categorías Activas"
        value={activeCategories}
        highlight="text-neutral-800"
      />
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: number;
  highlight?: string;
}

function MetricCard({ label, value, highlight }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white px-5 py-3 shadow-sm text-center">
      <p className="text-xs text-neutral-500 ">{label}</p>
      <p className={`text-[20px] font-semibold ${highlight}`}>{value}</p>
    </div>
  );
}
