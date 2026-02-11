import { httpClient } from "@/src/lib/http/http-client";
import { ScheduleBlock } from "../types/schedule-block.types";
import { CreateScheduleBlockDto } from "../types/schedule-block.types";

export const AdminScheduleBlocksService = {
  createGlobal(dto: CreateScheduleBlockDto) {
    return httpClient.request<ScheduleBlock>(
      "/admin/schedule-blocks",
      "POST",
      dto,
    );
  },

  getAllGlobal() {
    return httpClient.request<ScheduleBlock[]>(
      "/admin/schedule-blocks/global",
      "GET",
    );
  },

  getGlobalByDate(date: string) {
    return httpClient.request<ScheduleBlock[]>(
      `/admin/schedule-blocks/global/${date}`,
      "GET",
    );
  },

  deleteGlobal(id: string) {
    return httpClient.request<void>(
      `/admin/schedule-blocks/global/${id}`,
      "DELETE",
    );
  },
};
