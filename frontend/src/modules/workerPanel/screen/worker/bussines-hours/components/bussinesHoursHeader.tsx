"use client";

import { useState } from "react";
import { WorkerProfileModal } from "./WorkerProfileModal";

interface Props {
  workerId: string;
}

export default function BussinesHoursHeader({ workerId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-start gap-6 m-auto w-full">
        <h2 className="font-mono text-5xl text-black">Gestión de horarios</h2>

        <p className="text-black">Configura tu disponibilidad de la semana.</p>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-md bg-[#850E35] text-white text-sm hover:opacity-90 transition"
        >
          Editar Perfil Profesional
        </button>
      </div>

      <WorkerProfileModal
        workerId={workerId}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
