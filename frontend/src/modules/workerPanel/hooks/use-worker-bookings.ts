import { useQuery } from "@tanstack/react-query";
import { bookingService } from "../services/api/booking.service";
import { WorkerBookingFilters } from "../types/workerPanel.type";

export function useWorkerBookings(
  workerId: string | null,
  filters?: WorkerBookingFilters,
) {
  return useQuery({
    queryKey: ["worker-bookings", workerId, filters],
    queryFn: () => {
      if (!workerId) return Promise.resolve([]);
      return bookingService.getByWorker(workerId, filters);
    },
    enabled: !!workerId,
  });
}
