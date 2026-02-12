import { httpClient } from "@/src/lib/http/http-client";
import { BookingResponse } from "@/src/modules/booking/types/booking.types";

export const AdminBookingService = {
  getAll(view: "day" | "week" | "month", date?: string) {
    const query = new URLSearchParams();

    query.append("view", view);

    if (date) {
      query.append("date", date);
    }

    return httpClient.request<BookingResponse[]>(
      `/booking?${query.toString()}`,
      "GET",
    );
  },
};
