import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { scheduleBlockService } from "../services/schedule-block.service";
import { ScheduleBlock } from "../types/schedule-block.types";
import { CreateScheduleBlockPayload } from "../types/schedule-block.types";

export function useScheduleBlocks(workerId: string, date: string) {
  return useQuery<ScheduleBlock[]>({
    queryKey: ["schedule-blocks", workerId, date],
    queryFn: () => scheduleBlockService.getByDate(workerId, date),
    enabled: !!workerId && !!date,

    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useCreateScheduleBlock(workerId: string, date: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateScheduleBlockPayload) =>
      scheduleBlockService.create(workerId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["availability-history", workerId],
      });

      queryClient.invalidateQueries({
        queryKey: ["schedule-blocks", workerId, date],
      });
    },
  });
}

export function useDeleteScheduleBlock(workerId: string, date: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blockId: string) =>
      scheduleBlockService.delete(workerId, blockId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["availability-history", workerId],
      });
    },
  });
}
