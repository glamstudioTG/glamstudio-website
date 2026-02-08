import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { overrideHoursService } from "../services/override-hours.service";
import { OverrideHours } from "../types/override-hours.types";
import { CreateOverrideHoursPayload } from "../types/override-hours.types";

export function useOverrideHours(workerId: string, date: string) {
  return useQuery<OverrideHours[]>({
    queryKey: ["override-hours", workerId, date],
    queryFn: () => overrideHoursService.getByDate(workerId, date),
    enabled: !!workerId && !!date,

    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useCreateOverrideHours(workerId: string, date: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOverrideHoursPayload) =>
      overrideHoursService.create(workerId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["availability-history", workerId],
      });

      queryClient.invalidateQueries({
        queryKey: ["override-hours", workerId, date],
      });
    },
  });
}

export function useDeleteOverrideHours(workerId: string, date: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (overrideId: string) =>
      overrideHoursService.delete(workerId, overrideId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["availability-history", workerId],
      });
    },
  });
}
