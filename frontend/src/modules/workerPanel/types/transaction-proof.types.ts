import { BookingStatus, TransactionStatus } from "./workerPanel.type";

export type TransactionProofListResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
export type TransactionProofFilters = {
  search?: string;
  period?: "day" | "week" | "month";
  status?: string;
};

export type TransactionProofCardItem = {
  proof: {
    id: string;
    imageUrl: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
  };
  booking: {
    id: string;
    date: string;
    startTime: string;
    status: "PENDING_REVIEW" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  };
  client: { name: string; email: string };
  worker: { id: string; name: string };
  services: { name: string; price: number }[];
};

export type PendingTransactionProofItem = {
  proof: {
    id: string;
    imageUrl: string;
    status: TransactionStatus;
    uploadedAt: string;
  };

  booking: {
    id: string;
    date: string;
    startTime: string;
    status: BookingStatus;
  };

  client: {
    name: string;
    email: string;
  };

  worker: {
    id: string;
    name: string;
  };

  services: {
    name: string;
    price: number;
  }[];
};
