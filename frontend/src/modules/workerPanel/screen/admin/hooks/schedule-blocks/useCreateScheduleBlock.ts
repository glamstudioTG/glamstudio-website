import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminScheduleBlocksService } from "../../services/admin-schedule-blocks.service";
import { adminQueryKeys } from "../queryKeys";

export function useCreateGlobalScheduleBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AdminScheduleBlocksService.createGlobal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.all,
      });
    },
  });
}
