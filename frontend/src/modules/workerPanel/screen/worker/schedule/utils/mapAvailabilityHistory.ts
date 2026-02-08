import { OverrideHours } from "../types/override-hours.types";
import { ScheduleBlock } from "../types/schedule-block.types";

export type AvailabilityItem = {
  id: string;
  type: "BLOCK" | "OVERRIDE";
  date: string;
  startTime?: number | null;
  endTime?: number | null;
  reason?: string | null;
  workerId: string | null;
};

export function mapAvailabilityHistory(
  blocks: ScheduleBlock[],
  overrides: OverrideHours[],
): AvailabilityItem[] {
  return [
    ...blocks.map<AvailabilityItem>((b) => ({
      id: b.id,
      type: "BLOCK",
      date: b.date,
      startTime: b.startTime,
      endTime: b.endTime,
      reason: b.reason ?? "Bloqueo",
      workerId: b.workerId ?? null,
    })),
    ...overrides.map<AvailabilityItem>((o) => ({
      id: o.id,
      type: "OVERRIDE",
      date: o.date,
      startTime: o.startTime,
      endTime: o.endTime,
      reason: "Horario especial",
      workerId: o.workerId,
    })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));
}
