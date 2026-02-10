import { httpClient } from "@/src/lib/http/http-client";
import { Category } from "../types/category.types";

export const AdminCategoriesService = {
  create(dto: Partial<Category>) {
    return httpClient.request<Category>("/admin/categories", "POST", dto);
  },

  update(id: string, dto: Partial<Category>) {
    return httpClient.request<Category>(
      `/admin/categories/${id}`,
      "PATCH",
      dto,
    );
  },

  delete(id: string) {
    return httpClient.request<void>(`/admin/categories/${id}`, "DELETE");
  },
};
