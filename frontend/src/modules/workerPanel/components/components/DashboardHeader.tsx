import { Calendar } from "lucide-react";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-5xl font-mono text-gray-900 mb-2">Reservas</h1>
        <p className="text-sm text-gray-500">
          Gestionar citas y verificar pagos.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href={"https://calendar.google.com/calendar/u/3/r"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="flex gap-2 justify-center text-center rounded-full border border-[#850E35] min-w-30 px-4 py-2 text-sm text-black hover:bg-[#FFD7D7]/30 cursor-pointer">
            <Calendar size={20} className="text-[#850E35]" />
            Calendar{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}
