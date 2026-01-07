import { BookingState } from "../types/booking.types";

export const initialBookingState: BookingState = {
  step: 1,
  services: [],
  date: null,
  time: null,
  userInfo: null,
  paymentProof: null,
};
