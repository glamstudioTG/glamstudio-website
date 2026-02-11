import { useState } from "react";
import { Plus, UserPlus, Lock } from "lucide-react";
import { QuickActionItem } from "./QuickActionItem";
import { AddWorkerModal } from "./modal/AddWorkerModal";
import { GlobalBlockModal } from "./modal/GlobalBlockModal";

export function QuickActionsPanel() {
  const [openAddWorker, setOpenAddWorker] = useState(false);
  const [openGlobalBlock, setOpenGlobalBlock] = useState(false);

  return (
    <>
      <div className="rounded-xl border border-neutral-200 bg-[#fff5f7] p-6">
        <h3 className="mb-4 text-sm font-semibold text-[#850E35]">
          Accesos Rápidos
        </h3>

        <div className="flex flex-col gap-3">
          <QuickActionItem
            title="Nuevo Servicio"
            description="Crear servicio nuevo"
            icon={Plus}
            variant="green"
          />

          <QuickActionItem
            title="Nuevo Worker"
            description="Registrar personal"
            icon={UserPlus}
            variant="pink"
            onClick={() => setOpenAddWorker(true)}
          />

          <QuickActionItem
            title="Bloqueo Global"
            description="Cerrar agenda general"
            icon={Lock}
            variant="red"
            onClick={() => setOpenGlobalBlock(true)}
          />
        </div>
      </div>

      <AddWorkerModal open={openAddWorker} onOpenChange={setOpenAddWorker} />
      <GlobalBlockModal
        open={openGlobalBlock}
        onOpenChange={setOpenGlobalBlock}
      />
    </>
  );
}
