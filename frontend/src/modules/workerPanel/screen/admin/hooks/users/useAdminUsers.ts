import { useQuery } from "@tanstack/react-query";
import { AdminUsersService } from "../../services/admin-users.service";
import { adminQueryKeys } from "../queryKeys";

export function useAdminUsers() {
  return useQuery({
    queryKey: adminQueryKeys.users,
    queryFn: AdminUsersService.getAll,
    staleTime: 1000 * 60 * 5, // 5 min
    gcTime: 1000 * 60 * 30, // 30 min
  });
}
