import type { ISODate, HHMM } from "./common.types";

export type ScheduleBlock = {
  id: string;
  date: ISODate;

  startTime: number | null;
  endTime: number | null;

  reason?: string | null;
  workerId: string | null;

  createdAt: string;
  updatedAt: string;
};
export type CreateScheduleBlockPayload =
  | {
      date: ISODate;
      reason?: string;
    }
  | {
      date: ISODate;
      startTime: HHMM;
      endTime: HHMM;
      reason?: string;
    };
