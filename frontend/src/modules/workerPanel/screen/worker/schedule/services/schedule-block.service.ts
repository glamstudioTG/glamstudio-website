import { httpClient } from "@/src/lib/http/http-client";
import { ScheduleBlock } from "../types/schedule-block.types";

export class ScheduleBlockService {
  getAll(workerId: string) {
    return httpClient.request<ScheduleBlock[]>(
      `/workers/${workerId}/schedule-blocks/all`,
      "GET",
    );
  }
  getByDate(workerId: string, date: string) {
    return httpClient.request<ScheduleBlock[]>(
      `/workers/${workerId}/schedule-blocks?date=${date}`,
      "GET",
    );
  }

  create(
    workerId: string,
    payload: {
      date: string;
      startTime?: string;
      endTime?: string;
      reason?: string;
    },
  ) {
    return httpClient.request(
      `/workers/${workerId}/schedule-blocks`,
      "POST",
      payload,
    );
  }

  delete(workerId: string, id: string) {
    return httpClient.request(
      `/workers/${workerId}/schedule-blocks/${id}`,
      "DELETE",
    );
  }
}

export const scheduleBlockService = new ScheduleBlockService();
