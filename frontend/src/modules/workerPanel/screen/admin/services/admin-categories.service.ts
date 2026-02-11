import { httpClient } from "@/src/lib/http/http-client";
import { Category } from "../types/category.types";

export const AdminCategoriesService = {
  create(dto: Partial<Category>) {
    return httpClient.request<Category>("/category", "POST", dto);
  },

  update(id: string, dto: Partial<Category>) {
    return httpClient.request<Category>(`/category/${id}`, "PATCH", dto);
  },

  delete(id: string) {
    return httpClient.request<void>(`/category/${id}`, "DELETE");
  },

  getAll() {
    return httpClient.request<Category[]>("/category", "GET");
  },
};
