import AvailabilityCard from "./AvailabilityCard";
import { formatMinutesToHour } from "../../../../utils/formatMinutesToHour";
import { useDeleteScheduleBlock } from "../../hooks/useScheduleBlocks";
import { AvailabilityItem } from "../../types/availability-history.types";
import { Button } from "@/src/components/ui/button";

export function BlockCard({
  block,
  workerId,
}: {
  block: AvailabilityItem;
  workerId: string;
}) {
  const isFullDay = block.startTime === null;

  const subtitle = isFullDay
    ? "Bloqueo de día completo"
    : `${formatMinutesToHour(block.startTime!)} - ${formatMinutesToHour(
        block.endTime!,
      )}`;

  const deleteBlock = useDeleteScheduleBlock(workerId, block.date);

  return (
    <AvailabilityCard
      title={block.reason ?? "Bloqueo"}
      subtitle={subtitle}
      badge="BLOQUEO"
      color="red"
      action={
        <Button
          onClick={() => deleteBlock.mutate(block.id)}
          disabled={deleteBlock.isPending}
          className="text-xs text-white disabled:opacity-50 max-h-7 cursor-pointer"
        >
          Eliminar
        </Button>
      }
    />
  );
}
