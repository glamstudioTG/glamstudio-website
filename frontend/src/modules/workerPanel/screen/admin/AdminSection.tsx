"use client";

import { AdminTopbar } from "./components/layout/AdminTopbar";
import { StatsRow } from "./components/stats/StatsGrid";
import { useAdminDashboardStats } from "./hooks/statsAdmin/useAdminDashboardStats";
import { useAuth } from "@/src/hooks/auth/AuthContext";
import { AdminLoadingState } from "./util/AdminLoadingState";
import { AdminForbiddenState } from "./util/AdminForbiddenState";
import { AdminSidebar } from "./components/layout/AdminSidebar";

export default function AdminSection() {
  const { user, loading } = useAuth();
  const { data, isLoading } = useAdminDashboardStats();

  if (loading) {
    return <AdminLoadingState />;
  }

  if (user?.role !== "ADMIN") {
    return <AdminForbiddenState />;
  }

  if (isLoading || !data) {
    return <AdminLoadingState />;
  }

  return (
    <section className="min-h-screen bg-[#fdf0f0]">
      <AdminTopbar>
        <StatsRow
          today={data.todayBookings}
          pending={data.pendingReviews}
          income={data.monthlyIncome}
          workers={data.activeWorkers}
        />
      </AdminTopbar>

      <AdminSidebar />
    </section>
  );
}
