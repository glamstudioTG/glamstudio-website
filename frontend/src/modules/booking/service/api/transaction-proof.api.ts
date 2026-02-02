import { httpClient } from "@/src/lib/http/http-client";

export const TransactionProofApi = {
  upload(bookingId: string, imageUrl: string) {
    return httpClient.request(
      `booking/${bookingId}/transaction-proof`,
      "POST",
      { imageUrl },
    );
  },
};
