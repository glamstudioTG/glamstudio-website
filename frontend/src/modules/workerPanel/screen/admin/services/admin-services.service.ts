import { httpClient } from "@/src/lib/http/http-client";
import { Service } from "../types/service.types";

export const AdminServicesService = {
  getAll(categoryId?: string) {
    const query = categoryId ? `?categoryId=${categoryId}` : "";
    return httpClient.request<Service[]>(`/services${query}`, "GET");
  },

  getById(id: string) {
    return httpClient.request<Service>(`/services/${id}`, "GET");
  },

  create(categoryId: string, dto: Partial<Service>) {
    return httpClient.request<Service>(`/services/${categoryId}`, "POST", dto);
  },

  update(id: string, dto: Partial<Service>) {
    return httpClient.request<Service>(`/services/${id}`, "PATCH", dto);
  },

  delete(id: string) {
    return httpClient.request<void>(`/services/${id}`, "DELETE");
  },
};
