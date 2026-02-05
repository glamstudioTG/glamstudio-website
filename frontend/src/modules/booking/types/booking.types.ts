import { useBookingForm } from "../hooks/useBookingForm";
import useStepNavigation from "../hooks/useStepNavigation";

export type BookingStatus =
  | "PENDING_PAYMENT"
  | "PENDING_REVIEW"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export type BookingService = {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  isFeature?: boolean;
  totalPrice?: number;
  totalDuration?: number;
};

export type AvailableSlot = {
  startMin: number;
  endMin: number;
  start: string;
  end: string;
};

export type UserInfo = {
  id?: string;
  name: string;
  email?: string;
  phone: string;
  note?: string;
};

export type BookingState = {
  draft: BookingDraft;
  booking: Booking | null;
};

export type BookingDraft = {
  services: BookingService[];
  selectedWorker: BookingWorker | null;
  date: Date | null;
  time: string | null; // "08:00"
  userInfo: UserInfo | null;
  isGuest: boolean;
};

export type Booking = BookingDraft & {
  id: string;
  paymentProof: File | null;
  status: BookingStatus;
  expiresAt: Date;
};

export type BookingResponse = {
  id: string;
  status: BookingStatus;
  date: string;
  startTime: string;
  endTime: string;
  totalDuration: number;
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
    id: string;
    name: string;
    duration: number;
    price: number;
  }[];
};

export type StepValidator = (ctx: BookingDraft) => boolean;

export type UseStepNavigationProps = {
  totalSteps: number;
  validators?: Record<number, (ctx: unknown) => boolean>;
};

type Step = {
  id: number;
  label: string;
};

export type BookingStepperProps = {
  currentStep: number;
  navigation: ReturnType<typeof useStepNavigation>;
  steps: Step[];
};

export type StepProps = {
  booking: ReturnType<typeof useBookingForm>;
  navigation: ReturnType<typeof useStepNavigation>;
};

export interface BookingForm {
  state: BookingDraft;

  setServices: (services: BookingService[]) => void;
  addService: (service: BookingService) => void;
  removeService: (serviceId: string) => void;

  setSelectedWorker: (worker: BookingWorker) => void;
  setDate: (date: Date) => void;
  setTime: (time: string) => void;
  setUserInfo: (user: UserInfo) => void;

  confirmBooking: () => Promise<string>;
}

export interface BookingWorker {
  id: string;
  name: string;
  avatar?: string;
  categoryIds: string[];
}
