import { useQuery } from "@tanstack/react-query";
import { AdminServicesService } from "../../services/admin-services.service";
import { adminQueryKeys } from "../queryKeys";
import { Service } from "../../types/service.types";

export function useServices(categoryId?: string, search?: string) {
  return useQuery<Service[]>({
    queryKey: adminQueryKeys.services(categoryId, search),

    queryFn: () => AdminServicesService.getAll(categoryId, search),

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 20,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,

    enabled: search ? search.trim().length >= 2 : true,

    retry: 1,
  });
}
