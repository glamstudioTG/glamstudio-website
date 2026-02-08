import { ScheduleBlock } from "./schedule-block.types";
import { OverrideHours } from "./override-hours.types";

export type AvailabilityHistoryResponse = {
  blocks: ScheduleBlock[];
  overrides: OverrideHours[];
};

export type AvailabilityItem = {
  id: string;
  type: "BLOCK" | "OVERRIDE";
  date: string;
  startTime?: number | null;
  endTime?: number | null;
  reason?: string | null;
  workerId: string | null;
};
