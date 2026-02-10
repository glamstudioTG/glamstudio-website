import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminScheduleBlocksService } from "../../services/admin-schedule-blocks.service";
import { adminQueryKeys } from "../queryKeys";

export function useCreateScheduleBlock(date: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: AdminScheduleBlocksService.create,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: adminQueryKeys.scheduleBlocks(date),
      });
    },
  });
}
