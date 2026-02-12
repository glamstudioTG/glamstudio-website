"use client";

import { BookingResponse } from "@/src/modules/booking/types/booking.types";
import { BookingRow } from "./BookingRow";

interface Props {
  bookings: BookingResponse[];
  view: "day" | "week" | "month";
}

export function BookingTable({ bookings, view }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm flex flex-col w-full max-h-screen overflow-auto">
      <div className="px-4 lg:px-8 py-4 lg:py-6 border-b border-neutral-200 flex items-center justify-between">
        <h2 className="text-base lg:text-xl font-semibold text-neutral-800">
          {view === "day"
            ? "Reservas del Día"
            : view === "week"
              ? "Reservas de la Semana"
              : "Reservas del Mes"}
        </h2>

        <span className="text-xs lg:text-sm text-neutral-500">
          {bookings.length} reservas
        </span>
      </div>

      <div className="flex-1 divide-y divide-neutral-100">
        {bookings.length === 0 && (
          <div className="p-6 text-neutral-500 text-sm">
            No hay reservas en este período.
          </div>
        )}

        {bookings.map((booking) => (
          <BookingRow key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}
