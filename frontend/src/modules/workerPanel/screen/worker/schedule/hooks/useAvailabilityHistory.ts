import { useQuery } from "@tanstack/react-query";
import { availabilityHistoryService } from "../services/availability-history.service";
import { mapAvailabilityHistory } from "../utils/mapAvailabilityHistory";

export function useAvailabilityHistory(workerId: string) {
  return useQuery({
    queryKey: ["availability-history", workerId],
    queryFn: () => availabilityHistoryService.getAll(workerId),
    enabled: !!workerId,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    select: (data) => mapAvailabilityHistory(data.blocks, data.overrides),
  });
}
