import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminScheduleBlocksService } from "../../services/admin-schedule-blocks.service";
import { adminQueryKeys } from "../queryKeys";

export function useDeleteGlobalScheduleBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => AdminScheduleBlocksService.deleteGlobal(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.all,
      });
    },
  });
}
