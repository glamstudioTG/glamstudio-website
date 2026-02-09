import { httpClient } from "@/src/lib/http/http-client";
import {
  BusinessHour,
  CreateBusinessHoursPayload,
  UpdateBusinessHoursPayload,
} from "../types/business-hours.types";

export class BusinessHoursService {
  getAll(workerId: string) {
    return httpClient.request<BusinessHour[]>(
      `/workers/${workerId}/business-hours`,
      "GET",
    );
  }

  getByDay(workerId: string, day: string) {
    return httpClient.request<BusinessHour[]>(
      `/workers/${workerId}/business-hours/day/${day}`,
      "GET",
    );
  }

  create(workerId: string, payload: CreateBusinessHoursPayload) {
    return httpClient.request<BusinessHour>(
      `/workers/${workerId}/business-hours`,
      "POST",
      payload,
    );
  }

  update(workerId: string, id: string, payload: UpdateBusinessHoursPayload) {
    return httpClient.request<BusinessHour>(
      `/workers/${workerId}/business-hours/${id}`,
      "PATCH",
      payload,
    );
  }

  delete(workerId: string, id: string) {
    return httpClient.request(
      `/workers/${workerId}/business-hours/${id}`,
      "DELETE",
    );
  }
}

export const businessHoursService = new BusinessHoursService();
