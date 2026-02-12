import { useQuery } from "@tanstack/react-query";
import { AdminCategoriesService } from "../../services/admin-categories.service";
import { adminQueryKeys } from "../queryKeys";
import { Category } from "../../types/category.types";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: adminQueryKeys.categories,
    queryFn: AdminCategoriesService.getAll,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,

    retry: 1,
  });
}
