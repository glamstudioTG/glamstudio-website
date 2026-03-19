import {
  BookingResponse,
  CreateBookingPayload,
} from "../../types/booking.types";
import { httpClient } from "@/src/lib/http/http-client";

export const BookingApi = {
  create(payload: CreateBookingPayload): Promise<BookingResponse> {
    // validación ligera (opcional pero útil)
    if (!payload.workerId || !payload.date || !payload.startTime) {
      throw new Error("Payload incompleto");
    }

    return httpClient.request<BookingResponse>("booking", "POST", payload);
  },

  cancel(id: string) {
    return httpClient.request(`booking/${id}/cancel`, "PATCH");
  },
};
