import { useQuery } from "@tanstack/react-query";
import { AdminScheduleBlocksService } from "../../services/admin-schedule-blocks.service";
import { adminQueryKeys } from "../queryKeys";

export function useGlobalScheduleBlocks() {
  return useQuery({
    queryKey: adminQueryKeys.all,
    queryFn: () => AdminScheduleBlocksService.getAllGlobal(),
  });
}
