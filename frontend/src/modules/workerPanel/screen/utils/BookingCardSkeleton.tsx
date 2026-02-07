import { Skeleton } from "@/src/components/ui/shadcn-io/skeleton/skeleton";

export default function BookingCardSkeleton() {
  return (
    <Skeleton className="flex flex-col gap-4 rounded-xl bg-[#FFEAEA] p-4 shadow-sm md:flex-row md:items-center">
      {/* Cliente */}
      <div className="flex items-center gap-3 md:w-1/4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      <div className="space-y-2 md:w-1/4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="space-y-2 md:w-1/4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-28" />
      </div>

      <div className="flex items-center gap-3 md:w-1/4">
        <Skeleton className="h-12 w-10 rounded" />
        <Skeleton className="h-3 w-10" />
      </div>

      <div className="flex gap-2 md:flex-col">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </Skeleton>
  );
}
