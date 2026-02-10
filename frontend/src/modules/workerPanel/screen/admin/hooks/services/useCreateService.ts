import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminServicesService } from "../../services/admin-services.service";
import { adminQueryKeys } from "../queryKeys";
import { Service } from "../../types/service.types";

export function useCreateService(categoryId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: Partial<Service>) =>
      AdminServicesService.create(categoryId, dto),

    onSuccess: (newService) => {
      queryClient.setQueryData<Service[]>(
        adminQueryKeys.servicesByCategory(categoryId),
        (old) => (old ? [...old, newService] : [newService]),
      );
    },
  });
}
