import { httpClient } from "@/src/lib/http/http-client";
import {
  WorkerBooking,
  WorkerBookingFilters,
} from "../../types/workerPanel.type";

class BookingService {
  getByWorker(workerId: string, filters?: WorkerBookingFilters) {
    const params = new URLSearchParams(filters as any).toString();

    return httpClient.request<WorkerBooking[]>(
      `/booking/worker/${workerId}${params ? `?${params}` : ""}`,
      "GET",
    );
  }
}

export const bookingService = new BookingService();
