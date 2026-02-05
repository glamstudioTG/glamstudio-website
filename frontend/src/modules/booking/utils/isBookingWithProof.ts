import { Booking, BookingResponse } from "../types/booking.types";

export function isBookingWithProof(
  booking: Booking | BookingResponse | null,
): booking is Booking {
  return !!booking && "paymentProof" in booking;
}
