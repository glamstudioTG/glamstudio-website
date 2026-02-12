import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminServicesService } from "../../services/admin-services.service";
import { Service, ServiceDto } from "../../types/service.types";
import { adminQueryKeys } from "../queryKeys";

interface UpdateServicePayload {
  id: string;
  dto: ServiceDto;
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: UpdateServicePayload) =>
      AdminServicesService.update(id, dto),

    onMutate: async ({ id, dto }) => {
      await queryClient.cancelQueries({
        queryKey: adminQueryKeys.servicesBase,
      });

      const previousAllServices = queryClient.getQueriesData<Service[]>({
        queryKey: adminQueryKeys.servicesBase,
      });

      previousAllServices.forEach(([key]) => {
        queryClient.setQueryData<Service[]>(key, (old = []) =>
          old.map((s) => (s.id === id ? { ...s, ...dto } : s)),
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
