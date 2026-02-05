import { httpClient } from "@/src/lib/http/http-client";
import type { AvailableSlot } from "../../types/booking.types";

export const AvailabilityApi = {
  getSlots(workerId: string, date: string, serviceDuration: number) {
    return httpClient.request<AvailableSlot[]>(
      `workers/${workerId}/availability?date=${date}&serviceDuration=${serviceDuration}`,
      "GET",
    );
  },
};
