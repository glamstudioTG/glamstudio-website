import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminWorkerService } from "../../services/worker.service";
import { adminQueryKeys } from "../queryKeys";
import { Worker } from "../../types/worker.types";

export function useUpdateWorkerProfile(workerId: string) {
  const queryClient = useQueryClient();
  const queryKey = adminQueryKeys.worker(workerId);

  return useMutation({
    mutationFn: (dto: { bio?: string; profile?: string }) =>
      AdminWorkerService.updateProfile(workerId, dto),

    onMutate: async (dto) => {
      await queryClient.cancelQueries({ queryKey });

      const previousWorker = queryClient.getQueryData<Worker>(queryKey);

      if (previousWorker) {
        queryClient.setQueryData<Worker>(queryKey, {
          ...previousWorker,
          ...dto,
        });
      }

      return { previousWorker };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousWorker) {
        queryClient.setQueryData(queryKey, context.previousWorker);
      }
    },

    onSuccess: (updatedWorker) => {
      queryClient.setQueryData(queryKey, updatedWorker);
    },
  });
}
