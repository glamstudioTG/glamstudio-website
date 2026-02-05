"use client";

import { useMutation } from "@tanstack/react-query";
import { BookingApi } from "../../service/api/booking.api";
import { BookingDraft } from "../../types/booking.types";
import { BookingResponse } from "../../types/booking.types";

export function useCreateBooking() {
  return useMutation<BookingResponse, Error, BookingDraft>({
    mutationFn: (draft) => BookingApi.create(draft),
  });
}
