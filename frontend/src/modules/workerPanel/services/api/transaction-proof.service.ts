import { httpClient } from "@/src/lib/http/http-client";
import {
  TransactionProofCardItem,
  TransactionProofFilters,
  TransactionProofListResponse,
} from "../../types/transaction-proof.types";

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

  getHistory(page: number, filters?: TransactionProofFilters) {
    const params = new URLSearchParams({
      page: String(page),
      ...filters,
    });

    return httpClient.request<
      TransactionProofListResponse<TransactionProofCardItem>
    >(`/booking/history?${params.toString()}`, "GET");
  }
}

export const transactionProofService = new TransactionProofService();
