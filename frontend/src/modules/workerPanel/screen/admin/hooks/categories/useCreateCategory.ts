import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminCategoriesService } from "../../services/admin-categories.service";
import { adminQueryKeys } from "../queryKeys";
import { Category } from "../../types/category.types";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AdminCategoriesService.create,

    onSuccess: (newCategory) => {
      queryClient.setQueryData<Category[]>(adminQueryKeys.categories, (old) =>
        old ? [...old, newCategory] : [newCategory],
      );
    },
  });
}
