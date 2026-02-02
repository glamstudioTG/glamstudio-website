import { useCallback, useMemo, useState } from "react";
import {
  BookingDraft,
  BookingService,
  UserInfo,
  BookingWorker,
  Booking,
} from "../types/booking.types";
import { initialBookingState } from "../utils/initialBookingState";

export function useBookingForm() {
  const [state, setState] = useState<BookingDraft>(initialBookingState);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

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

  const buildCreateBookingPayload = useCallback(() => {
    if (!state.selectedWorker || !state.date || !state.time) {
      throw new Error("Booking incompleto");
    }

    return {
      workerId: state.selectedWorker.id,
      serviceIds: state.services.map((s) => s.id),
      date: state.date.toISOString(),
      startTime: Number(state.time),
      guestName: state.userInfo?.name,
      guestEmail: state.userInfo?.email,
      guestPhone: state.userInfo?.phone,
      comment: state.userInfo?.note,
    };
  }, [state]);

  const confirmBooking = useCallback(async () => {
    const payload = buildCreateBookingPayload();
    const fakeBookingId = crypto.randomUUID();

    setBooking({
      id: fakeBookingId,
      ...state,
      paymentProof: null,
      status: "PENDING_PAYMENT",
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    });

    return fakeBookingId;
  }, [buildCreateBookingPayload, state]);

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

    buildCreateBookingPayload,
  };
}
