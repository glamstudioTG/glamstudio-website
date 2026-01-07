import { useBookingForm } from "../hooks/useBookingForm";
import useStepNavigation from "../hooks/useStepNavigation";

export type BookingService = {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  featured?: boolean;
  totalPrice?: number;
  totalDuration?: number;
};

export type DayAvailability = {
  date: string;
  totalSlots: number;
  bookedSlots: number;
};

export type UserInfo = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  note?: string;
};

export type BookingState = {
  step: number;
  services: BookingService[];
  date: Date | null;
  time: string | null;
  userInfo: UserInfo | null;
  paymentProof: File | string | null;
};

export type StepValidator = () => boolean;

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
  state: {
    services: BookingService[];
  };
  setServices: (services: BookingService[]) => void;
}
