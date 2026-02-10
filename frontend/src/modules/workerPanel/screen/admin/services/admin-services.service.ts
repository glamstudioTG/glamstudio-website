import { httpClient } from "@/src/lib/http/http-client";
import { Service } from "../types/service.types";

export const AdminServicesService = {
  create(categoryId: string, dto: Partial<Service>) {
    return httpClient.request<Service>(
      `/admin/services/${categoryId}`,
      "POST",
      dto,
    );
  },

  update(id: string, dto: Partial<Service>) {
    return httpClient.request<Service>(`/admin/services/${id}`, "PATCH", dto);
  },

  delete(id: string) {
    return httpClient.request<void>(`/admin/services/${id}`, "DELETE");
  },
};
