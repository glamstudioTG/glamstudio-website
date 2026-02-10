import { LucideIcon } from "lucide-react";

type StatVariant = "today" | "pending" | "income" | "workers";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant: StatVariant;
}

const VARIANT_STYLES = {
  today: {
    icon: "text-[#850E35]",
    subtitle: "text-[#850E35]",
  },
  pending: {
    icon: "text-amber-600",
    subtitle: "text-amber-600",
  },
  income: {
    icon: "text-emerald-600",
    subtitle: "text-emerald-600",
  },
  workers: {
    icon: "text-neutral-400",
    subtitle: "text-neutral-500",
  },
} as const;

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant,
}: StatCardProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm w-full max-w-63.75">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">{title}</p>

        <Icon className={`w-5 h-5 ${styles.icon}`} />
      </div>

      <div className="mt-2 text-3xl font-semibold text-black">{value}</div>

      {subtitle && (
        <p className={`mt-1 text-sm ${styles.subtitle}`}>{subtitle}</p>
      )}
    </div>
  );
}
