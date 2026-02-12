import { httpClient } from "@/src/lib/http/http-client";
import { Worker } from "../types/worker.types";

export const AdminWorkerService = {
  getById(workerId: string): Promise<Worker> {
    return httpClient.request<Worker>(`/worker/${workerId}`, "GET");
  },

  updateProfile(
    workerId: string,
    dto: { bio?: string; avatar?: string },
  ): Promise<Worker> {
    return httpClient.request<Worker>(
      `/worker/${workerId}/profile`,
      "PATCH",
      dto,
    );
  },

  updateCategories(
    workerId: string,
    categoryIds: string[],
  ): Promise<{ ok: true }> {
    return httpClient.request<{ ok: true }>(
      `/worker/${workerId}/categories`,
      "PATCH",
      { categoryIds },
    );
  },
};
