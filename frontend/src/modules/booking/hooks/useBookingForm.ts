import { useCallback, useMemo, useState } from "react";
import { BookingState, BookingService, UserInfo } from "../types/booking.types";
import { initialBookingState } from "../utils/initialBookingState";

export function useBookingForm() {
  const [state, setState] = useState<BookingState>(initialBookingState);

  const totalDuration = useMemo(() => {
    return state.services.reduce((acc, s) => acc + s.duration, 0);
  }, [state.services]);

  const totalPrice = useMemo(() => {
    return state.services.reduce((acc, p) => acc + p.price, 0);
  }, [state.services]);

  const setServices = useCallback((services: BookingService[]) => {
    setState((prev) => ({
      ...prev,
      services,
      date: null,
      time: null,
    }));
  }, []);

  const addService = useCallback((service: BookingService) => {
    setState((prev) => {
      const exist = prev.services.some((s) => s.id === service.id);
      if (exist) return prev;
      return {
        ...prev,
        services: [...prev.services, service],
      };
    });
  }, []);

  const setDate = useCallback((date: Date) => {
    setState((prev) => ({
      ...prev,
      date,
      time: null,
    }));
  }, []);

  const setTime = useCallback((time: string) => {
    setState((prev) => ({
      ...prev,
      time,
    }));
  }, []);

  const setUserInfo = useCallback((user: UserInfo) => {
    setState((prev) => ({
      ...prev,
      userInfo: user,
    }));
  }, []);

  const setPaymentProof = useCallback((file: File) => {
    setState((prev) => ({
      ...prev,
      paymentProof: file,
    }));
  }, []);

  const nextStep = () => {
    setState((prev) => ({
      ...prev,
      step: prev.step + 1,
    }));
  };

  const prevStep = () => {
    setState((prev) => ({
      ...prev,
      step: prev.step - 1,
    }));
  };

  return {
    state,

    totalDuration,
    totalPrice,

    setServices,
    addService,
    setDate,
    setTime,
    setUserInfo,
    setPaymentProof,

    nextStep,
    prevStep,
  };
}
