"use client";

import { ServiceMetrics } from "./ServiceMetrics";
import { useAdminServiceStats } from "../../../../hooks/statsAdmin/useAdminDashboardStats";
import { useAuth } from "@/src/hooks/auth/AuthContext";

export function ServiceManagementHeader() {
  const { user, loading } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const { data, isLoading } = useAdminServiceStats();

  if (loading) return null;

  if (!isAdmin) {
    return (
      <div className="p-6 text-sm text-red-600">
        No tienes permisos para ver esta sección.
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold font-mono text-neutral-800">
        Gestión de Servicios
      </h1>

      <div className="self-start sm:self-auto">
        {isLoading ? (
          <div className="flex gap-6">
            <div className="h-14 w-40 bg-neutral-200 rounded animate-pulse" />
            <div className="h-14 w-40 bg-neutral-200 rounded animate-pulse" />
          </div>
        ) : (
          <ServiceMetrics
            totalServices={data?.totalServices ?? 0}
            activeCategories={data?.totalCategories ?? 0}
          />
        )}
      </div>
    </div>
  );
}
