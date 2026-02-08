import { httpClient } from "@/src/lib/http/http-client";
import { OverrideHours } from "../types/override-hours.types";

export class OverrideHoursService {
  getAll(workerId: string) {
    return httpClient.request<OverrideHours[]>(
      `/workers/${workerId}/override-hours/all`,
      "GET",
    );
  }
  getByDate(workerId: string, date: string) {
    return httpClient.request<OverrideHours[]>(
      `/workers/${workerId}/override-hours?date=${date}`,
      "GET",
    );
  }

  create(
    workerId: string,
    payload: {
      date: string;
      startTime: string;
      endTime: string;
    },
  ) {
    return httpClient.request(
      `/workers/${workerId}/override-hours`,
      "POST",
      payload,
    );
  }

  delete(workerId: string, id: string) {
    return httpClient.request(
      `/workers/${workerId}/override-hours/${id}`,
      "DELETE",
    );
  }
}

export const overrideHoursService = new OverrideHoursService();
