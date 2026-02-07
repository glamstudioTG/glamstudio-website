"use client";

import { useState } from "react";
import { usePendingTransactionProofs } from "@/src/modules/workerPanel/hooks/use-review-transaction-proof";
import BookingCard from "../../../utils/BookingCard";
import BookingCardSkeleton from "../../../utils/BookingCardSkeleton";
import EmptyBookingsState from "../../../utils/EmptyBookingsState";
import TransactionProofFilters from "../../../utils/TransactionProofFilters";
import { TransactionProofFilters as Filters } from "@/src/modules/workerPanel/types/transaction-proof.types";

export default function PendingTransactionProofs({
  workerId,
}: {
  workerId: string;
}) {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({});

  const { data, isLoading } = usePendingTransactionProofs(
    workerId,
    page,
    filters,
  );

  if (isLoading) {
    return (
      <div className="mt-6 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <BookingCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return <EmptyBookingsState />;
  }

  return (
    <div className="mt-6 space-y-4">
      <TransactionProofFilters onChange={setFilters} value={filters} />

      <h2 className="text-sm font-medium text-black">
        Pendientes por aprobar ({data.meta.total})
      </h2>

      {data.data.map((item) => (
        <BookingCard
          key={item.proof.id}
          name={item.client.name}
          service={item.services.map((s) => s.name).join(", ")}
          date={`${item.booking.date} ${item.booking.startTime}`}
          worker={item.worker.name}
          status={item.booking.status}
          proof={item.proof.imageUrl}
          transactionProof={item.proof}
        />
      ))}

      <div className="flex justify-center gap-2 pt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded-full border px-4 py-1 text-sm disabled:opacity-40 text-[#850E35] cursor-pointer"
        >
          Anterior
        </button>

        <span className="text-sm text-gray-500 flex items-center ">
          Página {page} de {data.meta.totalPages}
        </span>

        <button
          disabled={page >= data.meta.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="rounded-full border px-4 py-1 text-sm disabled:opacity-40 text-[#850E35] cursor-pointer"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
