import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminCategoriesService } from "../../services/admin-categories.service";
import { adminQueryKeys } from "../queryKeys";
import { Category } from "../../types/category.types";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Partial<Category> }) =>
      AdminCategoriesService.update(id, dto),

    onSuccess: (updatedCategory) => {
      queryClient.setQueryData<Category[]>(adminQueryKeys.categories, (old) =>
        old?.map((cat) =>
          cat.id === updatedCategory.id ? updatedCategory : cat,
        ),
      );
    },
  });
}
