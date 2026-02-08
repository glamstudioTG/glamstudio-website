import { BookingStatus } from "./enums";

export type WorkerBookingsFilters = {
  status?: BookingStatus;
  period?: "day" | "week" | "month";
  search?: string;
  order?: "newest" | "oldest";
};
