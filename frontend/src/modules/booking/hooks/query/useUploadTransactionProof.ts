"use client";

import { useMutation } from "@tanstack/react-query";
import { TransactionProofApi } from "../../service/api/transaction-proof.api";

type UploadTransactionProofInput = {
  bookingId: string;
  imageUrl: string;
};

export function useUploadTransactionProof() {
  return useMutation<void, Error, UploadTransactionProofInput>({
    mutationFn: async ({ bookingId, imageUrl }) => {
      await TransactionProofApi.upload(bookingId, imageUrl);
    },
  });
}
