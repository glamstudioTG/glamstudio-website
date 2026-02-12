import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminCategoriesService } from "../../services/admin-categories.service";
import { adminQueryKeys } from "../queryKeys";
import { Category } from "../../types/category.types";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AdminCategoriesService.create,

    onMutate: async (newCategory) => {
      await queryClient.cancelQueries({
        queryKey: adminQueryKeys.categories,
      });

      const previousCategories = queryClient.getQueryData<Category[]>(
        adminQueryKeys.categories,
      );

      // Optimistic update
      queryClient.setQueryData<Category[]>(
        adminQueryKeys.categories,
        (old = []) => [
          ...old,
          {
            id: "temp-" + Date.now(),
            ...newCategory,
          } as Category,
        ],
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

    onSuccess: (createdCategory) => {
      queryClient.setQueryData<Category[]>(
        adminQueryKeys.categories,
        (old = []) =>
          old.map((cat) =>
            cat.id.startsWith("temp-") ? createdCategory : cat,
          ),
      );
    },
  });
}
