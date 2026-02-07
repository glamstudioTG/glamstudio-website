import { Input } from "@/src/components/ui/shadcn-io/input/input";
import { WorkerBookingFilters } from "@/src/modules/workerPanel/types/workerPanel.type";

type Props = {
  onChange: (filters: WorkerBookingFilters) => void;
};

export default function BookingFilters({ onChange }: Props) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl bg-[#FFEAEA] text-black p-4 shadow-sm">
      <Input
        placeholder="Search client or service..."
        className="w-full md:w-64"
        onChange={(e) => onChange({ search: e.target.value })}
      />

      <select
        className="rounded-lg border px-3 py-2 text-sm text-gray-500"
        onChange={(e) => onChange({ period: e.target.value as any })}
      >
        <option value="">All time</option>
        <option value="day">Today</option>
        <option value="week">This week</option>
        <option value="month">This month</option>
      </select>

      <select
        className="rounded-lg border px-3 py-2 text-sm text-gray-500"
        onChange={(e) => onChange({ status: e.target.value })}
      >
        <option value="">All status</option>
        <option value="PENDING_REVIEW">Pending</option>
        <option value="CONFIRMED">Confirmed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
    </div>
  );
}
