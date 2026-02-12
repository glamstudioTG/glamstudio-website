"use client";

import { BookingResponse } from "@/src/modules/booking/types/booking.types";

interface Props {
  booking: BookingResponse;
}

export function BookingRow({ booking }: Props) {
  return (
    <div className="px-4 lg:px-8 py-4 lg:py-5 hover:bg-neutral-50 transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="space-y-1">
        <p className="font-semibold text-neutral-800 text-sm lg:text-base">
          {booking.client.name}
        </p>

        <p className="text-xs lg:text-sm text-neutral-500">
          {booking.services.map((s) => s.name).join(", ")}
        </p>

        <p className="text-xs text-neutral-400">
          {booking.date} • {booking.startTime}
        </p>
      </div>

      <div className="flex sm:block justify-between items-center sm:text-right space-y-0 sm:space-y-1">
        <p className="font-semibold text-neutral-800 text-sm lg:text-base">
          ${booking.totalPrice.toLocaleString()}
        </p>

        <span
          className={`text-[10px] lg:text-xs px-2 lg:px-3 py-1 rounded-full font-medium ${
            booking.status === "CONFIRMED"
              ? "bg-green-100 text-green-700"
              : booking.status === "PENDING_PAYMENT"
                ? "bg-yellow-100 text-yellow-700"
                : booking.status === "CANCELLED"
                  ? "bg-red-100 text-red-700"
                  : "bg-neutral-100 text-neutral-600"
          }`}
        >
          {booking.status}
        </span>
      </div>
    </div>
  );
}
