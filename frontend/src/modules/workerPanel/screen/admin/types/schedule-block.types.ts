export interface ScheduleBlock {
  id: string;
  date: string;
  startTime?: number;
  endTime?: number;
  reason?: string;
  workerId?: string;
}

export interface CreateScheduleBlockDto {
  date: string;

  startTime?: string;

  endTime?: string;

  reason?: string;
}
