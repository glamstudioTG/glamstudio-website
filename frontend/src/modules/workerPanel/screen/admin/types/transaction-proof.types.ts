export type TransactionStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface TransactionProof {
  id: string;
  imageUrl: string;
  status: TransactionStatus;
  uploadedAt: string;
  reviewedAt?: string;
  booking: {
    id: string;
    date: string;
    workerId: string;
  };
}

export interface AdminTransactionProofQuery {
  search?: string;
  workerId?: string;
  serviceId?: string;
  status?: TransactionStatus;
  period?: "day" | "week" | "month";
  page?: number;
  limit?: number;
}
