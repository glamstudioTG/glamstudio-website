import BookingCard from "./BookingCard";
import { useWorkerBookings } from "../../hooks/use-worker-bookings";
import { WorkerBookingFilters } from "../../types/workerPanel.type";
import { Skeleton } from "@/src/components/ui/shadcn-io/skeleton/skeleton";
import BookingCardSkeleton from "./utils/BookingCardSkeleton";
import EmptyBookingsState from "./utils/EmptyBookingsState";

type Props = {
  workerId: string;
  filters: WorkerBookingFilters;
};

export default function BookingList({ workerId, filters }: Props) {
  const { data, isLoading } = useWorkerBookings(workerId, filters);

  if (isLoading) {
    return (
      <div className="mt-6 space-y-4">
        <Skeleton className="h-4 w-48" />
        {Array.from({ length: 3 }).map((_, i) => (
          <BookingCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (!data || data.length === 0) {
    return <EmptyBookingsState />;
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-sm font-medium text-black">
        Pendientes por aprobar ({data.length})
      </h2>

      {data.map((booking) => (
        <BookingCard
          key={booking.id}
          name={booking.client.name}
          service={booking.services.map((s) => s.name).join(", ")}
          date={`${booking.date} ${booking.startTime}`}
          worker={booking.worker.name}
          status={booking.status}
          proof={booking.transactionProof?.imageUrl ?? ""}
          transactionProof={booking.transactionProof ?? null}
        />
      ))}
    </div>
  );
}
