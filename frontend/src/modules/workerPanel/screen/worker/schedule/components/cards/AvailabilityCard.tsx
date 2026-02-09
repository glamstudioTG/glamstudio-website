type Props = {
  title: string;
  subtitle: string;
  badge: string;
  color: "red" | "orange";
  action?: React.ReactNode;
};

const COLORS = {
  red: "bg-red-100 text-red-700 border-red-200",
  orange: "bg-[#D4AF37]/40 text-orange-700 border-orange-200",
};

export default function AvailabilityCard({
  title,
  subtitle,
  badge,
  color,
  action,
}: Props) {
  return (
    <div className={`rounded-xl border p-4 shadow-sm ${COLORS[color]}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="mt-2 text-sm opacity-80">{subtitle}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold">
            {badge}
          </span>

          {action}
        </div>
      </div>
    </div>
  );
}
