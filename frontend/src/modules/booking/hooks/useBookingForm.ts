import { useCallback, useMemo, useState } from "react";
import {
  BookingDraft,
  BookingService,
  UserInfo,
  BookingWorker,
  Booking,
  BookingResponse,
  CreateBookingPayload,
} from "../types/booking.types";
import { initialBookingState } from "../utils/initialBookingState";
import { useCreateBooking } from "./query/useCreateBooking";
import { useQueryClient } from "@tanstack/react-query";
import { formatLocalDate } from "../utils/formatLocalDate";

export function useBookingForm() {
  const queryClient = useQueryClient();
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

  const setSelectedWorker = useCallback(
    (worker: BookingWorker) => {
      queryClient.removeQueries({ queryKey: ["availability"] });

      setState((prev) => ({
        ...prev,
        selectedWorker: worker,
        date: null,
        time: null,
      }));
    },
    [queryClient],
  );

  const setDate = useCallback((date: Date) => {
    setState((prev) => ({ ...prev, date, time: null }));
  }, []);

  const setTime = useCallback((time: string | null) => {
    setState((prev) => ({ ...prev, time }));
  }, []);

  const setUserInfo = useCallback((user: UserInfo) => {
    setState((prev) => ({ ...prev, userInfo: user }));
  }, []);

  const confirmBooking = useCallback(async () => {
    if (!state.selectedWorker) {
      throw new Error("No worker selected");
    }

    if (!state.date || !state.time || !state.userInfo) {
      throw new Error("Booking incompleto");
    }

    const payload: CreateBookingPayload = {
      workerId: state.selectedWorker.id,
      date: formatLocalDate(state.date),
      startTime: state.time,
      serviceIds: state.services.map((s) => s.id),
      name: state.userInfo.name,
      email: state.userInfo.email,
      phone: state.userInfo.phone,
      comment: state.userInfo.note ?? "",
    };

    console.log("PAYLOAD REAL:", payload);

    const bookingResponse = await createBookingMutation.mutateAsync(payload);

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
