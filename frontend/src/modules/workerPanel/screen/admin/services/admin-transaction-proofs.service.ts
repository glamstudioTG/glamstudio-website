import { httpClient } from "@/src/lib/http/http-client";
import {
  AdminTransactionProofQuery,
  TransactionProof,
} from "../types/transaction-proof.types";
import { ApiListResponse } from "../types/common.types";

export const AdminTransactionProofService = {
  getAll(query: AdminTransactionProofQuery) {
    return httpClient.request<ApiListResponse<TransactionProof>>(
      "/admin/transaction-proofs",
      "GET",
      undefined,
      {
        params: serializeQuery(query),
      },
    );
  },
};
