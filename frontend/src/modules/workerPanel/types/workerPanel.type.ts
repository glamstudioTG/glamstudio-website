export type BookingStatus =
  | "PENDING_PAYMENT"
  | "PENDING_REVIEW"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export type TransactionStatus = "PENDING" | "APPROVED" | "REJECTED";

export type TransactionProof = {
  id: string;
  imageUrl: string;
  status: TransactionStatus;
};

export type WorkerBooking = {
  id: string;
  status: BookingStatus;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;

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

  transactionProof: {
    id: string;
    imageUrl: string;
    status: TransactionStatus;
  } | null;
};

export type WorkerBookingFilters = {
  status?: string;
  period?: "day" | "week" | "month";
  search?: string;
};

export type PropsBookingCard = {
  name: string;
  service: string;
  date: string;
  worker: string;
  status: BookingStatus;
  proof: string;
  transactionProof: TransactionProof | null;
};
