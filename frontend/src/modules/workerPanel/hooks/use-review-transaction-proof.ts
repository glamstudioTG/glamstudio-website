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

    onSuccess: (_, __, variables) => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "tp" && query.queryKey[1] === "pending",
      });

      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "tp" && query.queryKey[1] === "history",
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
    queryKey: ["tp", "pending", workerId, page, JSON.stringify(filters ?? {})],
    queryFn: () => transactionProofService.getPending(workerId, page, filters),
    enabled: !!workerId,

    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    retry: false,
  });
}

export function useTransactionProofHistory(
  workerId: string,
  page: number,
  filters?: TransactionProofFilters,
) {
  return useQuery({
    queryKey: ["tp", "history", workerId, page, JSON.stringify(filters ?? {})],
    queryFn: () => transactionProofService.getHistory(workerId, page, filters),
    enabled: !!workerId,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
}
