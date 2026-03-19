import { useMutation } from "@tanstack/react-query";
import { BookingApi } from "@/src/modules/booking/service/api/booking.api";
import { CreateBookingPayload } from "@/src/modules/booking/types/booking.types";

export function useCreateBooking() {
  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => BookingApi.create(payload),
  });
}
