import { useQuery } from "@tanstack/react-query";
import { AvailabilityApi } from "../../service/api/availability.api";
import { AvailableSlot } from "../../types/booking.types";

export function useAvailabilityQuery(
  workerId?: string,
  date?: Date | null,
  serviceDuration?: number,
) {
  return useQuery<AvailableSlot[]>({
    queryKey: [
      "availability",
      workerId,
      date?.toISOString().split("T")[0],
      serviceDuration,
    ],
    queryFn: () =>
      AvailabilityApi.getSlots(
        workerId!,
        date!.toISOString().split("T")[0],
        serviceDuration!,
      ),
    enabled: !!workerId && !!date && !!serviceDuration,

    staleTime: 0,
    gcTime: 0,
    placeholderData: undefined,
  });
}
