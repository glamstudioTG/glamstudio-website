import { httpClient } from "@/src/lib/http/http-client";
import { BusinessHours } from "../types/business-hours.types";

export class BusinessHoursService {
  getByWorker(workerId: string) {
    return httpClient.request<BusinessHours[]>(
      `/workers/${workerId}/business-hours`,
      "GET",
    );
  }
}

export const businessHoursService = new BusinessHoursService();
