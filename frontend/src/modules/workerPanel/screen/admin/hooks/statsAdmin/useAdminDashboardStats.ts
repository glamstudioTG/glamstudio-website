import { useQuery } from "@tanstack/react-query";
import { AdminStatsService } from "../../services/admin-stats.service";
import { useAuth } from "@/src/hooks/auth/AuthContext";
import { AdminServiceStats } from "../../types/admin-stats.types";
import { adminQueryKeys } from "../queryKeys";

export function useAdminDashboardStats() {
  const { user, loading } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  return useQuery({
    queryKey: ["admin-dashboard-stats"],

    queryFn: () => AdminStatsService.getStats(),

    enabled: !loading && isAdmin,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,

    retry: 1,
  });
}

export function useAdminServiceStats() {
  return useQuery<AdminServiceStats>({
    queryKey: adminQueryKeys.serviceStats,
    queryFn: AdminStatsService.getServiceStats,

    staleTime: Infinity,
    gcTime: Infinity,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
