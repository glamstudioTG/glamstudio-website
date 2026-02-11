import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminServicesService } from "../../services/admin-services.service";
import { ServiceDto } from "../../types/service.types";

interface UpdateServicePayload {
  id: string;
  dto: ServiceDto;
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: UpdateServicePayload) =>
      AdminServicesService.update(id, dto),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
  });
}
