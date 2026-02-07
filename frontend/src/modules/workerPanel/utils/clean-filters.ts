import type { TransactionProofFilters } from "../types/transaction-proof.types";

export function cleanFilters(
  filters?: TransactionProofFilters,
): TransactionProofFilters | undefined {
  if (!filters) return undefined;

  return Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) => value !== undefined && value !== "",
    ),
  ) as TransactionProofFilters;
}
