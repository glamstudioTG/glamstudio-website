"use client";

import { BookingResponse } from "@/src/modules/booking/types/booking.types";
import { BookingRow } from "./BookingRow";

interface Props {
  bookings: BookingResponse[];
}

export function RecentBookings({ bookings }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 h-150 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-neutral-800">
            Reservas Recientes
          </h2>
          <p className="text-xs text-neutral-500">
            Últimas transacciones y estados
          </p>
        </div>

        <button className="text-xs border px-3 py-1 rounded-md hover:bg-neutral-100">
          Ver Todas
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {bookings.slice(0, 5).map((booking) => (
          <BookingRow key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}
