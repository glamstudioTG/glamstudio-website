import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminServicesService } from "../../services/admin-services.service";
import { adminQueryKeys } from "../queryKeys";
import { Service } from "../../types/service.types";

export function useDeleteService(categoryId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AdminServicesService.delete,

    onSuccess: (_, serviceId) => {
      queryClient.setQueryData<Service[]>(
        adminQueryKeys.servicesByCategory(categoryId),
        (old) => old?.filter((s) => s.id !== serviceId),
      );
    },
  });
}
