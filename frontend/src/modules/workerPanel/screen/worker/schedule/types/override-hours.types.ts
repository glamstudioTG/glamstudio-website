export type OverrideHours = {
  id: string;

  date: string;

  startTime: number;
  endTime: number;

  workerId: string | null;

  createdAt: string;
  updatedAt: string;
};

export type CreateOverrideHoursPayload = {
  date: string;
  startTime: string;
  endTime: string;
};
