import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminCategoriesService } from "../../services/admin-categories.service";
import { adminQueryKeys } from "../queryKeys";
import { Category } from "../../types/category.types";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AdminCategoriesService.delete,

    onSuccess: (_, categoryId) => {
      queryClient.setQueryData<Category[]>(adminQueryKeys.categories, (old) =>
        old?.filter((cat) => cat.id !== categoryId),
      );
    },
  });
}
