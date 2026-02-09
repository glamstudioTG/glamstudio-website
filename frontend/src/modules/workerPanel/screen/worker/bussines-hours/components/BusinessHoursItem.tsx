"use client";

import { BusinessHour } from "../types/business-hours.types";
import { useDeleteBusinessHours } from "../hooks/useBusinessHours";
import { formatMinutesToHour } from "../../../utils/formatMinutesToHour";
import { Trash, SquarePen } from "lucide-react";
import { useState } from "react";
import BusinessHoursDialog from "../modal/BusinessHoursDialog";

export default function BusinessHoursItem({
  item,
  workerId,
}: {
  item: BusinessHour;
  workerId: string;
}) {
  const deleteHour = useDeleteBusinessHours(workerId);

  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div className="flex w-full max-w-125 items-center bg-gray-50 justify-between rounded-lg  px-3 py-2 text-sm">
      <span className="text-gray-700">
        {formatMinutesToHour(item.startTime)} –{" "}
        {formatMinutesToHour(item.endTime)}
      </span>

      <div className="flex gap-3">
        <button
          className="text-gray-500 hover:text-yellow-500 cursor-pointer"
          onClick={() => setOpenEdit(true)}
        >
          <SquarePen size={16} />
        </button>
        <BusinessHoursDialog
          open={openEdit}
          onOpenChange={setOpenEdit}
          workerId={workerId}
          day={item.day}
          initialData={item}
        />

        <button
          className="text-gray-500 hover:text-red-500 p-2 rounded-lg hover:bg-red-200 cursor-pointer "
          disabled={deleteHour.isPending}
          onClick={() => deleteHour.mutate(item.id)}
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}
