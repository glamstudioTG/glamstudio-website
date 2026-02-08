export type DayOfWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY";

export type BusinessHours = {
  id: string;
  workerId: string;
  day: DayOfWeek;
  startTime: number;
  endTime: number;
  createdAt?: string;
  updatedAt?: string;
  reason?: string;
};

export type DayBusinessHours = {
  startMin: number;
  endMin: number;
};

export type BusinessHoursRange = {
  day: DayOfWeek;
  startMin: number;
  endMin: number;
};
