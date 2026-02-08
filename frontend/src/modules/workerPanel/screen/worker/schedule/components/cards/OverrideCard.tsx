import AvailabilityCard from "./AvailabilityCard";
import { formatMinutesToHour } from "../../../../utils/formatMinutesToHour";
import { useDeleteOverrideHours } from "../../hooks/useOverrideHours";
import { AvailabilityItem } from "../../types/availability-history.types";
import { Button } from "@/src/components/ui/button";

export function OverrideCard({
  override,
  workerId,
}: {
  override: AvailabilityItem;
  workerId: string;
}) {
  const deleteOverride = useDeleteOverrideHours(workerId, override.date);

  const start = override.startTime;
  const end = override.endTime;
  const hasRange = start != null && end != null;

  return (
    <AvailabilityCard
      title="Horario especial"
      subtitle={
        hasRange
          ? `${formatMinutesToHour(start)} - ${formatMinutesToHour(end)}`
          : "Horario especial"
      }
      badge="Cambio de horario"
      color="orange"
      action={
        <Button
          onClick={() => deleteOverride.mutate(override.id)}
          disabled={deleteOverride.isPending}
          className="text-xs text-white disabled:opacity-50 max-h-7 cursor-pointer"
        >
          Eliminar
        </Button>
      }
    />
  );
}
