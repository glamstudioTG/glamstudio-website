import { httpClient } from "@/src/lib/http/http-client";
import {
  AdminDashboardStats,
  AdminServiceStats,
} from "../types/admin-stats.types";

export const AdminStatsService = {
  getStats() {
    return httpClient.request<AdminDashboardStats>(
      "/admin/dashboard/stats",
      "GET",
    );
  },

  getServiceStats() {
    return httpClient.request<AdminServiceStats>(
      "/admin/dashboard/service/stats",
      "GET",
    );
  },
};
