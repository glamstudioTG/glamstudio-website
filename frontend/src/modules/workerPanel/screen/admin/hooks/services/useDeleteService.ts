import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminServicesService } from "../../services/admin-services.service";

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceId: string) => AdminServicesService.delete(serviceId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });

      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
  });
}
