import ZoomableProofImage from "./ZoomableProofImage";
import { useReviewTransactionProof } from "@/src/modules/workerPanel/hooks/use-review-transaction-proof";
import { PropsBookingCard } from "@/src/modules/workerPanel/types/workerPanel.type";
import { formatMinutesToHour } from "./formatMinutesToHour";
import { Spinner } from "@/src/components/ui/shadcn-io/spinner/spinner";

export default function BookingCard({
  name,
  status,
  service,
  date,
  worker,
  proof,
  transactionProof,
}: PropsBookingCard) {
  const { mutate, isPending } = useReviewTransactionProof();

  const canReview =
    transactionProof?.status === "PENDING" && status === "PENDING_REVIEW";
  const hasProof = !!transactionProof;

  // 🔥 FORMATEO LIMPIO
  const [onlyDate, rawMinutes] = date.split(" ");
  const formattedTime = formatMinutesToHour(Number(rawMinutes));

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-[#FFEAEA] p-4 shadow-sm md:flex-row md:items-center">
      <div className="flex items-center gap-3 md:w-1/4">
        <div>
          <p className="text-sm font-medium text-black">{name}</p>
          <p className="text-xs text-gray-500">{status}</p>
        </div>
      </div>

      <div className="md:w-1/4">
        <p className="text-xs text-gray-500">SERVICE</p>
        <p className="text-sm text-black">{service}</p>
      </div>

      <div className="md:w-1/4">
        <p className="text-xs text-gray-500">DATE & WORKER</p>
        <p className="text-sm text-black">
          {onlyDate} {formattedTime}
        </p>
        <p className="text-xs text-gray-500">w/ {worker}</p>
      </div>

      <div className="md:w-1/4 flex items-center gap-3">
        {hasProof ? (
          <ZoomableProofImage src={proof} />
        ) : (
          <span className="text-xs text-gray-400">Sin comprobante</span>
        )}
      </div>

      {canReview && (
        <div className="flex gap-2 md:flex-col">
          <button
            disabled={isPending}
            onClick={() =>
              mutate({
                proofId: transactionProof.id,
                status: "APPROVED",
              })
            }
            className="flex items-center justify-center gap-2 rounded-full bg-[#850E35] cursor-pointer px-4 py-1 text-sm text-white disabled:opacity-50"
          >
            {isPending ? <Spinner /> : "Confirmar"}
          </button>

          <button
            disabled={isPending}
            onClick={() =>
              mutate({
                proofId: transactionProof.id,
                status: "REJECTED",
              })
            }
            className="flex items-center justify-center gap-2 rounded-full border px-4 cursor-pointer py-1 text-sm text-red-500 disabled:opacity-50"
          >
            {isPending ? <Spinner /> : "Rechazar"}
          </button>
        </div>
      )}
    </div>
  );
}
