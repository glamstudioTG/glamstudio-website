export enum DayOfWeek {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}
export type BusinessHoursDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workerId: string;
  day: DayOfWeek;
  initialData?: BusinessHour; // si existe => editar
};

export type BusinessHour = {
  id: string;
  workerId: string;
  day: DayOfWeek;
  startTime: number;
  endTime: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateBusinessHoursPayload = {
  day: DayOfWeek;
  startTime: string;
  endTime: string;
};

export type UpdateBusinessHoursPayload = Partial<CreateBusinessHoursPayload>;
