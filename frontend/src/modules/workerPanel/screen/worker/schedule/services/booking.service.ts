import { httpClient } from "@/src/lib/http/http-client";
import { WorkerBooking } from "../types/booking.types";

export class BookingService {
  getByWorker(
    workerId: string,
    params?: {
      period?: "day" | "week" | "month";
      from?: string;
      to?: string;
      status?: string;
      order?: "newest" | "oldest";
      search?: string;
    },
  ) {
    const qs = params ? `?${new URLSearchParams(params as any)}` : "";

    return httpClient.request<WorkerBooking[]>(
      `/booking/worker/${workerId}${qs}`,
      "GET",
    );
  }
}

export const bookingService = new BookingService();
