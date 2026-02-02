import { httpClient } from "@/src/lib/http/http-client";

export const AvailabilityApi = {
  getSlots(workerId: string, date: string, serviceDuration: number) {
    return httpClient.request<{ startTime: number; endTime: number }[]>(
      `workers/${workerId}/availability?date=${date}&serviceDuration=${serviceDuration}`,
      "GET",
    );
  },
};
