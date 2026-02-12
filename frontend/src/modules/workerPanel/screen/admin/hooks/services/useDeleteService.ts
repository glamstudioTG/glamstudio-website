import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminServicesService } from "../../services/admin-services.service";
import { adminQueryKeys } from "../queryKeys";
import { Service } from "../../types/service.types";

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceId: string) => AdminServicesService.delete(serviceId),

    onMutate: async (serviceId: string) => {
      await queryClient.cancelQueries({
        queryKey: adminQueryKeys.servicesBase,
      });

      const previousAllServices = queryClient.getQueriesData<Service[]>({
        queryKey: adminQueryKeys.servicesBase,
      });

      previousAllServices.forEach(([key]) => {
        queryClient.setQueryData<Service[]>(key, (old = []) =>
          old.filter((s) => s.id !== serviceId),
        );
      });

      return { previousAllServices };
    },

    onError: (_, __, context) => {
      context?.previousAllServices?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
  });
}
