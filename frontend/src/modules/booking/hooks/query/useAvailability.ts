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
      "availbility",
      workerId,
      date?.toISOString().slice(0, 10),
      serviceDuration,
    ],
    queryFn: () =>
      AvailabilityApi.getSlots(
        workerId!,
        date!.toISOString().slice(0, 10),
        serviceDuration!,
      ),

    enabled: !!workerId && !!date && !!serviceDuration,
  });
}
