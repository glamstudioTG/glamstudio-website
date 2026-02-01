import { httpClient } from "@/src/lib/http/http-client";
import { Category } from "../types/category.types";

export const categoryService = {
  getAllWhitServices(): Promise<Category[]> {
    return httpClient.request<Category[]>("category/services", "GET");
  },
};
