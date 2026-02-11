import { useQuery } from "@tanstack/react-query";
import { AdminCategoriesService } from "../../services/admin-categories.service";

export function useCategories() {
  return useQuery({
    queryKey: ["admin-categories"],
    queryFn: AdminCategoriesService.getAll,

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,

    refetchOnWindowFocus: false,
  });
}
