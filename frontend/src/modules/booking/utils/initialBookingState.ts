import { BookingDraft } from "../types/booking.types";

export const initialBookingState: BookingDraft = {
  services: [],
  selectedWorker: null,
  date: null,
  time: null,
  userInfo: null,
};
