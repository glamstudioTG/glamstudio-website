import { useQuery } from "@tanstack/react-query";
import { AdminScheduleBlocksService } from "../../services/admin-schedule-blocks.service";
import { adminQueryKeys } from "../queryKeys";

export function useGetGlobalScheduleBlocks(date: string) {
  return useQuery({
    queryKey: adminQueryKeys.scheduleBlocks(date),
    queryFn: () => AdminScheduleBlocksService.getGlobalDat4e(date),
    enabled: !!date,
    staleTime: 1000 * 60 * 5,
  });
}
