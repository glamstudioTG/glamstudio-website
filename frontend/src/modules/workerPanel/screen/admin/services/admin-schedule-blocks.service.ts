import { httpClient } from "@/src/lib/http/http-client";
import { ScheduleBlock } from "../types/schedule-block.types";

export const AdminScheduleBlocksService = {
  create(dto: Partial<ScheduleBlock>) {
    return httpClient.request<ScheduleBlock>(
      "/admin/schedule-blocks",
      "POST",
      dto,
    );
  },

  getByDate(date: string) {
    return httpClient.request<ScheduleBlock[]>(
      `/admin/schedule-blocks/${date}`,
      "GET",
    );
  },

  getGlobalDat4e(date: string) {
    return httpClient.request<ScheduleBlock[]>(
      `/admin/schedule-block/global/:date`,
      "GET",
    );
  },

  delete(id: string) {
    return httpClient.request<void>(`/admin/schedule-blocks/${id}`, "DELETE");
  },
};
