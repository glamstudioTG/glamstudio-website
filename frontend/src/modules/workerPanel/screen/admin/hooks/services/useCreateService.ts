import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminServicesService } from "../../services/admin-services.service";
import { ServiceDto } from "../../types/service.types";

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

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
  });
}
