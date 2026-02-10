import { httpClient } from "@/src/lib/http/http-client";

export interface AdminDashboardStats {
  todayBookings: number;
  pendingReviews: number;
  monthlyIncome: number;
  activeWorkers: number;
}

export const AdminStatsService = {
  getStats() {
    return httpClient.request<AdminDashboardStats>(
      "/admin/dashboard/stats",
      "GET",
    );
  },
};
