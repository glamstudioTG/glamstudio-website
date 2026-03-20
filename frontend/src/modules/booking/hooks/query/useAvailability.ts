import { useQuery } from "@tanstack/react-query";
import { AvailabilityApi } from "../../service/api/availability.api";
import { AvailableSlot } from "../../types/booking.types";
import { formatLocalDate } from "../../utils/formatLocalDate";

export function useAvailabilityQuery(
  workerId?: string,
  date?: Date | null,
  serviceDuration?: number,
) {
  return useQuery<AvailableSlot[]>({
    queryKey: [
      "availability",
      workerId,
      date ? formatLocalDate(date) : null,
      serviceDuration,
    ],

    queryFn: () =>
      AvailabilityApi.getSlots(
        workerId!,
        formatLocalDate(date!),
        serviceDuration!,
      ),
    enabled: !!workerId && !!date && !!serviceDuration,

    staleTime: 0,
    gcTime: 0,
    placeholderData: undefined,
  });
}
