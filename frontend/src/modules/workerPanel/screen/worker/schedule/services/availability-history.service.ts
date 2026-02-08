import { httpClient } from "@/src/lib/http/http-client";
import { AvailabilityHistoryResponse } from "../types/availability-history.types";

export class AvailabilityHistoryService {
  getAll(workerId: string) {
    return httpClient.request<AvailabilityHistoryResponse>(
      `/workers/${workerId}/availability/history`,
      "GET",
    );
  }
}

export const availabilityHistoryService = new AvailabilityHistoryService();
