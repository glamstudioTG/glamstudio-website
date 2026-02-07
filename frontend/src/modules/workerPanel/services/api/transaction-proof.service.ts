import { httpClient } from "@/src/lib/http/http-client";
import {
  TransactionProofCardItem,
  TransactionProofFilters,
  TransactionProofListResponse,
} from "../../types/transaction-proof.types";
import { cleanFilters } from "../../utils/clean-filters";

export type ReviewTransactionPayload = {
  status: "APPROVED" | "REJECTED";
};

class TransactionProofService {
  review(proofId: string, payload: ReviewTransactionPayload) {
    return httpClient.request(`/booking/${proofId}/review`, "PATCH", payload);
  }

  getPending(
    workerId: string,
    page: number,
    filters?: TransactionProofFilters,
  ) {
    const params = new URLSearchParams({
      page: String(page),
      ...filters,
    });

    return httpClient.request<
      TransactionProofListResponse<TransactionProofCardItem>
    >(`/booking/worker/${workerId}/pending?${params.toString()}`, "GET");
  }

  getHistory(
    workerId: string,
    page: number,
    filters?: TransactionProofFilters,
  ) {
    const params = new URLSearchParams({
      page: String(page),
      ...cleanFilters(filters),
    });

    return httpClient.request<
      TransactionProofListResponse<TransactionProofCardItem>
    >(`/booking/worker/${workerId}/history?${params.toString()}`, "GET");
  }
}

export const transactionProofService = new TransactionProofService();
