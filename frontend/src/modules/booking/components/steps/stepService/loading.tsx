"use client";

import { Skeleton } from "@/src/components/ui/shadcn-io/skeleton/skeleton";

export function ServiceListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4 max-h-82.5 overflow-y-auto p-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="
            grid grid-cols-[1fr_auto_auto]
            items-center gap-6
            rounded-xl px-5 py-4
            bg-white
          "
        >
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-28" />
          </div>

          <div className="space-y-2 text-right">
            <Skeleton className="h-4 w-16 ml-auto" />
            <Skeleton className="h-3 w-10 ml-auto" />
          </div>

          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function ServiceWorkerSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div
        className="
          flex items-center gap-3
          rounded-xl p-4
          border border-black/10
          bg-white
        "
      >
        <Skeleton className="h-10 w-10 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}
