export interface ScheduleBlock {
  id: string;
  date: string;
  startTime?: number;
  endTime?: number;
  reason?: string;
  workerId?: string;
}
