import { useCallback, useMemo, useState } from "react";
import {
  BookingDraft,
  BookingService,
  UserInfo,
  BookingWorker,
  Booking,
  BookingResponse,
} from "../types/booking.types";
import { initialBookingState } from "../utils/initialBookingState";
import { useCreateBooking } from "./query/useCreateBooking";
import { Spinner } from "@/src/components/ui/shadcn-io/spinner/spinner";

export function useBookingForm() {
  const [state, setState] = useState<BookingDraft>(initialBookingState);
  const [booking, setBooking] = useState<Booking | null | BookingResponse>(
    null,
  );
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  const createBookingMutation = useCreateBooking();

  const totalDuration = useMemo(
    () => state.services.reduce((acc, s) => acc + s.duration, 0),
    [state.services],
  );

  const totalPrice = useMemo(
    () => state.services.reduce((acc, s) => acc + s.price, 0),
    [state.services],
  );

  const setServices = useCallback((services: BookingService[]) => {
    setState((prev) => ({
      ...prev,
      services,
      selectedWorker: null,
      date: null,
      time: null,
    }));
  }, []);

  const removeService = useCallback((serviceId: string) => {
    setState((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== serviceId),
      selectedWorker: null,
      date: null,
      time: null,
    }));
  }, []);

  const addService = useCallback((service: BookingService) => {
    setState((prev) => {
      if (prev.services.some((s) => s.id === service.id)) return prev;
      return { ...prev, services: [...prev.services, service] };
    });
  }, []);

  const setSelectedWorker = useCallback((worker: BookingWorker) => {
    setState((prev) => ({
      ...prev,
      selectedWorker: worker,
      date: null,
      time: null,
    }));
  }, []);

  const setDate = useCallback((date: Date) => {
    setState((prev) => ({ ...prev, date, time: null }));
  }, []);

  const setTime = useCallback((time: string) => {
    setState((prev) => ({ ...prev, time }));
  }, []);

  const setUserInfo = useCallback((user: UserInfo) => {
    setState((prev) => ({ ...prev, userInfo: user }));
  }, []);

  const confirmBooking = useCallback(async () => {
    const bookingResponse = await createBookingMutation.mutateAsync(state);

    setBooking(bookingResponse);

    return bookingResponse.id;
  }, [state, createBookingMutation]);

  return {
    state,
    booking,
    paymentProof,
    totalDuration,
    totalPrice,

    removeService,
    confirmBooking,
    setServices,
    addService,
    setSelectedWorker,
    setDate,
    setBooking,
    setTime,
    setUserInfo,
    setPaymentProof,

    isCreatingBooking: createBookingMutation.isPending,
  };
}
