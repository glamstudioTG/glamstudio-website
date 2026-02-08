"use client";

import { useAvailabilityHistory } from "../../hooks/useAvailabilityHistory";
import { mapAvailabilityHistory } from "../../utils/mapAvailabilityHistory";
import { AvailabilityHistoryCard } from "./AvailabilityHistoryCard";
import CreateScheduleBlockDialog from "../Modals/CreateBlockModal";
import { useState } from "react";
import CreateOverrideHoursDialog from "../Modals/OverrideHoursModal";
import { BlockCard } from "./BlockCards";
import { OverrideCard } from "./OverrideCard";

export default function AvailabilityHistoryList({
  workerId,
}: {
  workerId: string;
}) {
  const { data: items, isLoading } = useAvailabilityHistory(workerId);
  const [openBlock, setOpenBlock] = useState(false);
  const [openOverride, setOpenOverride] = useState(false);

  if (isLoading) return <p>Cargando historial…</p>;
  if (!items) return null;

  return (
    <div className="space-y-4 mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium text-black">
          Historial de disponibilidad
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => setOpenBlock(true)}
            className="bg-[#B0154E] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#B0154E]/80 cursor-pointer"
          >
            Crear bloqueo
          </button>

          <button
            onClick={() => setOpenOverride(true)}
            className="bg-[#F59E0B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#F59E0B]/80 cursor-pointer"
          >
            Cambiar horario
          </button>
        </div>
      </div>

      {items.length === 0 && (
        <p className="text-sm text-gray-400">
          No hay bloqueos ni overrides registrados.
        </p>
      )}

      {items.map((item) =>
        item.type === "BLOCK" ? (
          <BlockCard key={item.id} block={item} workerId={workerId} />
        ) : (
          <OverrideCard key={item.id} override={item} workerId={workerId} />
        ),
      )}
      <CreateScheduleBlockDialog
        open={openBlock}
        onOpenChange={setOpenBlock}
        workerId={workerId}
        baseDate={new Date().toISOString().slice(0, 10)}
      />

      <CreateOverrideHoursDialog
        open={openOverride}
        onOpenChange={setOpenOverride}
        workerId={workerId}
        baseDate={new Date().toISOString().slice(0, 10)}
      />
    </div>
  );
}
