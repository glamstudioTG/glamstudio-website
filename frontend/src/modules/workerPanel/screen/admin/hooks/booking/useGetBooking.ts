import { useQuery } from "@tanstack/react-query";
import { AdminBookingService } from "../../services/admin-booking.service";
import { BookingResponse } from "@/src/modules/booking/types/booking.types";

export function useBookings(view: "day" | "week" | "month", date?: string) {
  return useQuery<BookingResponse[]>({
    queryKey: ["admin", "bookings", view, date],
    queryFn: () => AdminBookingService.getAll(view, date),

    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
  });
}
