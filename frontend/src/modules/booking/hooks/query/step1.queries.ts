import { useQuery, useMutation } from "@tanstack/react-query";
import { Step1Api } from "../../service/api/step-1.api";
import type { BookingService, BookingWorker } from "../../types/booking.types";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: Step1Api.getCategories,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useGetServicesQuery(enabled = true) {
  return useQuery<BookingService[]>({
    queryKey: ["services", "all"],
    queryFn: Step1Api.getServices,
    enabled,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useFeaturedServicesQuery(enabled = true) {
  return useQuery<BookingService[]>({
    queryKey: ["services", "featured"],
    queryFn: Step1Api.getFeaturedServices,
    enabled,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useSearchServicesQuery(query: string) {
  return useQuery<BookingService[]>({
    queryKey: ["services-search", query],
    queryFn: () => Step1Api.searchServices(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
}

export function useServicesByCategoryQuery(categoryId: string | null) {
  return useQuery<BookingService[]>({
    queryKey: ["services", "category", categoryId],
    queryFn: () => Step1Api.getServicesByCategory(categoryId!),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useWorkersByServicesMutation() {
  return useMutation<BookingWorker[], Error, string[]>({
    mutationFn: Step1Api.getWorkersByServices,
  });
}
