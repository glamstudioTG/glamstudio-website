// export type ScheduleDay = {
//   date: string;
//   bookings: ScheduleBooking[];
//   blocks: ScheduleBlock[];
//   overrideHours?: OverrideHours | null;
// };

// export type ScheduleEvent =
//   | { type: "BOOKING"; data: ScheduleBooking }
//   | { type: "BLOCK"; data: ScheduleBlock }
//   | { type: "OVERRIDE"; data: OverrideHours };

import { WorkerBooking } from "./booking.types";
import { ScheduleBlock } from "./schedule-block.types";
import { OverrideHours } from "./override-hours.types";

export type ScheduleDayData = {
  date: string;

  bookings: WorkerBooking[];
  blocks: ScheduleBlock[];
  overrideHours: OverrideHours | null;
};

export type ScheduleEventType = "BOOKING" | "BLOCK" | "OVERRIDE" | "BUSINESS";

export type ScheduleEvent = {
  id: string;
  date: string; // yyyy-MM-dd
  startMin: number; // 0–1440
  endMin: number; // 0–1440
  title: string;
  type: ScheduleEventType;
  reason?: string;
  color?: string;
};
