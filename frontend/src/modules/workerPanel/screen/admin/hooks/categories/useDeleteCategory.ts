import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminCategoriesService } from "../../services/admin-categories.service";
import { adminQueryKeys } from "../queryKeys";
import { Category } from "../../types/category.types";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AdminCategoriesService.delete,

    onMutate: async (categoryId: string) => {
      await queryClient.cancelQueries({
        queryKey: adminQueryKeys.categories,
      });

      const previousCategories = queryClient.getQueryData<Category[]>(
        adminQueryKeys.categories,
      );

      queryClient.setQueryData<Category[]>(
        adminQueryKeys.categories,
        (old = []) => old.filter((cat) => cat.id !== categoryId),
      );

      return { previousCategories };
    },

    onError: (_, __, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(
          adminQueryKeys.categories,
          context.previousCategories,
        );
      }
    },
  });
}
