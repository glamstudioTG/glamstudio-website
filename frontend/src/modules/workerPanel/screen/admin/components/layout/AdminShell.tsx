"use client";

import { useState } from "react";
import { BookingTable } from "../bookings/BookingsTable";
import { useBookings } from "../../hooks/booking/useGetBooking";

export function AdminShell() {
  const [view, setView] = useState<"day" | "week" | "month">("day");

  const today = new Date().toISOString().split("T")[0];

  const { data: bookings = [], isLoading } = useBookings(view, today);

  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#fdf0f0] p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-neutral-200 p-10 animate-pulse h-125" />
      </section>
    );
  }

  return (
    <section className="bg-[#fdf0f0]">
      <div className="space-y-6 lg:space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl lg:text-4xl font-semibold text-neutral-800">
            Gestión de Reservas
          </h1>

          <div className="flex gap-2 bg-white p-1 rounded-xl border border-neutral-200 shadow-sm w-full sm:w-auto overflow-x-auto">
            {["day", "week", "month"].map((option) => (
              <button
                key={option}
                onClick={() => setView(option as "day" | "week" | "month")}
                className={`flex-1 sm:flex-none px-4 lg:px-5 py-2 text-sm rounded-lg transition font-medium whitespace-nowrap ${
                  view === option
                    ? "bg-[#850E35] text-white"
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {option === "day"
                  ? "Día"
                  : option === "week"
                    ? "Semana"
                    : "Mes"}
              </button>
            ))}
          </div>
        </div>

        <BookingTable bookings={bookings} view={view} />
      </div>
    </section>
  );
}
