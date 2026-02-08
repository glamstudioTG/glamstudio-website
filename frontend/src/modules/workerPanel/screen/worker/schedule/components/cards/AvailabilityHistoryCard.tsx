import { format } from "date-fns";
import { formatMinutesToHour } from "../../../../utils/formatMinutesToHour";

export function AvailabilityHistoryCard({ item }: { item: any }) {
  const isBlock = item.type === "BLOCK";

  const color = isBlock
    ? "bg-red-100 border-red-200 text-red-700"
    : "bg-orange-100 border-orange-200 text-orange-700";

  const timeLabel =
    item.startTime != null
      ? `${formatMinutesToHour(item.startTime)} - ${formatMinutesToHour(
          item.endTime,
        )}`
      : "Día completo";

  return (
    <div className={`rounded-xl border p-4 shadow-sm ${color}`}>
      <div className="flex justify-between">
        <h3 className="font-medium">{isBlock ? "Bloqueo" : "Override"}</h3>
        <span className="text-xs bg-white px-3 py-1 rounded-full font-semibold">
          {isBlock ? "BLOQUEO" : "OVERRIDE"}
        </span>
      </div>

      <p className="mt-2 text-sm">
        {format(new Date(item.date), "PPP")} — {timeLabel}
      </p>

      {item.reason && (
        <p className="mt-1 text-xs opacity-80">Motivo: {item.reason}</p>
      )}
    </div>
  );
}
