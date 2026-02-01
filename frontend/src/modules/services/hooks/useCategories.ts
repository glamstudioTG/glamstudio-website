import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../service/category.service";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories-with-services"],
    queryFn: categoryService.getAllWhitServices,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
