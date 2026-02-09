import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { businessHoursService } from "../services/business-hours.service";
import {
  CreateBusinessHoursPayload,
  UpdateBusinessHoursPayload,
} from "../types/business-hours.types";

export function useBusinessHours(workerId: string) {
  return useQuery({
    queryKey: ["business-hours", workerId],
    queryFn: () => businessHoursService.getAll(workerId),
    enabled: !!workerId,
    staleTime: 60_000,
  });
}

export function useCreateBusinessHours(workerId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBusinessHoursPayload) =>
      businessHoursService.create(workerId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["business-hours", workerId] });
    },
  });
}

export function useUpdateBusinessHours(workerId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateBusinessHoursPayload;
    }) => businessHoursService.update(workerId, id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["business-hours", workerId] });
    },
  });
}

export function useDeleteBusinessHours(workerId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => businessHoursService.delete(workerId, id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["business-hours", workerId] });
    },
  });
}
