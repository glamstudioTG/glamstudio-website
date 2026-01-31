import { BookingDraft } from "../types/booking.types";

export const initialBookingState: BookingDraft = {
  step: 1,
  services: [],
  selectedWorker: null,
  date: null,
  time: null,
  userInfo: null,
};
