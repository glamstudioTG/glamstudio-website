import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { AdminTransactionProofService } from "../../services/admin-transaction-proofs.service";
import { AdminTransactionProofQuery } from "../../types/transaction-proof.types";
import { adminQueryKeys } from "../queryKeys";

export function useTransactionProofs(filters: AdminTransactionProofQuery) {
  return useQuery({
    queryKey: adminQueryKeys.transactionProofs(filters),
    queryFn: () => AdminTransactionProofService.getAll(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2,
  });
}
