import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminServicesService } from "../../services/admin-services.service";
import { Service, ServiceDto } from "../../types/service.types";
import { adminQueryKeys } from "../queryKeys";

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      dto,
    }: {
      categoryId: string;
      dto: ServiceDto;
    }) => AdminServicesService.create(categoryId, dto),

    onMutate: async ({ categoryId, dto }) => {
      await queryClient.cancelQueries({
        queryKey: adminQueryKeys.servicesBase,
      });

      const previousAllServices = queryClient.getQueriesData<Service[]>({
        queryKey: adminQueryKeys.servicesBase,
      });

      const tempService: Service = {
        id: "temp-" + Date.now(),
        categoryId,
        ...dto,
      } as Service;

      // actualizar todas las queries de services (all + filtradas)
      previousAllServices.forEach(([key, data]) => {
        queryClient.setQueryData<Service[]>(key, (old = []) => [
          ...old,
          tempService,
        ]);
      });

      return { previousAllServices };
    },

    onError: (_, __, context) => {
      context?.previousAllServices?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },

    onSuccess: (createdService) => {
      const allQueries = queryClient.getQueriesData<Service[]>({
        queryKey: adminQueryKeys.servicesBase,
      });

      allQueries.forEach(([key]) => {
        queryClient.setQueryData<Service[]>(key, (old = []) =>
          old.map((s) => (s.id.startsWith("temp-") ? createdService : s)),
        );
      });
    },
  });
}
