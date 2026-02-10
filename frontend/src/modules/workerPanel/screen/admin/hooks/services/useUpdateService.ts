import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminServicesService } from "../../services/admin-services.service";
import { adminQueryKeys } from "../queryKeys";
import { Service } from "../../types/service.types";

export function useUpdateService(categoryId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Partial<Service> }) =>
      AdminServicesService.update(id, dto),

    onSuccess: (updatedService) => {
      queryClient.setQueryData<Service[]>(
        adminQueryKeys.servicesByCategory(categoryId),
        (old) =>
          old?.map((s) => (s.id === updatedService.id ? updatedService : s)),
      );
    },
  });
}
