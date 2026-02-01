"use client";

import { Skeleton } from "@/src/components/ui/shadcn-io/skeleton/skeleton";

type Props = {
  direction: "normal" | "reverse";
};

export default function ServiceCategorySkeleton({ direction }: Props) {
  const isReversed = direction === "reverse";

  return (
    <div className="bg-[#FFD7D7] rounded-xl p-6 md:p-10 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div
          className={`flex justify-center ${
            isReversed ? "md:order-2 justify-end" : "md:order-1 justify-start"
          }`}
        >
          <div className="relative w-44 h-64 md:w-59.25 md:h-78.75 m-auto">
            <div className="absolute inset-0 border-2 border-[#850E35]/30 rounded-lg translate-x-1.5 translate-y-1.5" />
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        </div>

        <div
          className={`text-center md:text-left ${
            isReversed ? "md:order-1" : "md:order-2"
          }`}
        >
          <Skeleton className="h-10 w-3/4 mb-4 mx-auto md:mx-0" />

          <div className="space-y-2 mb-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Skeleton className="h-12 w-40 rounded-md" />
            <Skeleton className="h-12 w-40 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
