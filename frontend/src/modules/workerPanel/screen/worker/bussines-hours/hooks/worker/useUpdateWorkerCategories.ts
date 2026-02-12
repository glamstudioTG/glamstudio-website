import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminWorkerService } from "../../services/worker.service";
import { adminQueryKeys } from "../queryKeys";
import { Worker, WorkerCategoryRelation } from "../../types/worker.types";
import { Category } from "../../../../admin/types/category.types";

export function useUpdateWorkerCategories(workerId: string) {
  const queryClient = useQueryClient();

  const workerKey = adminQueryKeys.worker(workerId);
  const categoriesKey = adminQueryKeys.categories;

  return useMutation({
    mutationFn: (categoryIds: string[]) =>
      AdminWorkerService.updateCategories(workerId, categoryIds),

    onMutate: async (categoryIds) => {
      await queryClient.cancelQueries({ queryKey: workerKey });

      const previousWorker = queryClient.getQueryData<Worker>(workerKey);

      const allCategories =
        queryClient.getQueryData<Category[]>(categoriesKey) ?? [];

      if (!previousWorker) {
        return { previousWorker };
      }

      const hydratedRelations: WorkerCategoryRelation[] = categoryIds.map(
        (id) => {
          const category = allCategories.find((c) => c.id === id);

          return {
            categoryId: id,
            category: category
              ? { id: category.id, name: category.name }
              : { id, name: "" },
          };
        },
      );

      const updatedWorker: Worker = {
        ...previousWorker,
        categories: hydratedRelations,
      };

      queryClient.setQueryData<Worker>(workerKey, updatedWorker);

      return { previousWorker };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousWorker) {
        queryClient.setQueryData(workerKey, context.previousWorker);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: workerKey });
    },
  });
}
