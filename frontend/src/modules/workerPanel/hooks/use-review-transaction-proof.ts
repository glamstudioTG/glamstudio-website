import {
  useMutation,
  useQueryClient,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { transactionProofService } from "../services/api/transaction-proof.service";
import { TransactionProofFilters } from "../types/transaction-proof.types";

export function useReviewTransactionProof() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      proofId,
      status,
    }: {
      proofId: string;
      status: "APPROVED" | "REJECTED";
    }) => transactionProofService.review(proofId, { status }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tp", "pending"],
      });
    },
  });
}

export function usePendingTransactionProofs(
  workerId: string,
  page: number,
  filters?: TransactionProofFilters,
) {
  return useQuery({
    queryKey: ["tp", "pending", workerId, page, filters],
    queryFn: () => transactionProofService.getPending(workerId, page, filters),
    placeholderData: keepPreviousData,
    enabled: !!workerId,
  });
}
export function useTransactionProofHistory(page: number) {
  return useQuery({
    queryKey: ["transaction-proofs", "history", page],
    queryFn: () => transactionProofService.getHistory(page),
    placeholderData: keepPreviousData,
  });
}
