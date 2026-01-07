import { DayAvailability } from "../types/booking.types";

export const isDayFullyBooked = (
  date: Date,
  availability: DayAvailability[]
) => {
  const iso = date.toISOString().split("T")[0];
  const day = availability.find((d) => d.date === iso);
  return day ? day.bookedSlots >= day.totalSlots : false;
};

export const isDayPartiallyBooked = (
  date: Date,
  availability: DayAvailability[]
) => {
  const iso = date.toISOString().split("T")[0];
  const day = availability.find((d) => d.date === iso);
  return day ? day.bookedSlots > 0 && day.bookedSlots < day.totalSlots : false;
};
