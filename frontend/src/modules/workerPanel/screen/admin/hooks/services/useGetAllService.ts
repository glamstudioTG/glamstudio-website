import { useQuery } from "@tanstack/react-query";
import { AdminServicesService } from "../../services/admin-services.service";

export function useServices(categoryId?: string) {
  return useQuery({
    queryKey: ["admin-services", categoryId ?? "all"],
    queryFn: () => AdminServicesService.getAll(categoryId),

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
  });
}
