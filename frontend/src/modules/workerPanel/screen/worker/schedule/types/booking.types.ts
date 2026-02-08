export type BookingClient = {
  name: string;
  email?: string | null;
};

export type BookingWorker = {
  id: string;
  name: string;
};

export type BookingServiceItem = {
  id: string;
  name: string;
  duration: number;
  price: number;
};

import { BookingStatus, TransactionStatus } from "./enums";

export type BookingTransactionProof = {
  id: string;
  imageUrl: string;
  status: TransactionStatus;
} | null;

export type WorkerBooking = {
  id: string;

  status: BookingStatus;

  date: string;

  startTime: number;
  endTime: number;

  totalDuration: number;
  totalPrice: number;

  client: {
    name: string;
    email?: string | null;
  };

  worker: {
    id: string;
    name: string;
  };

  services: {
    id: string;
    name: string;
    duration: number;
    price: number;
  }[];

  transactionProof?: BookingTransactionProof;
};
