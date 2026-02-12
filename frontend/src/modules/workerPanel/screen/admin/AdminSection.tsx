"use client";

import { StatsRow } from "./components/stats/StatsGrid";
import { useAdminDashboardStats } from "./hooks/statsAdmin/useAdminDashboardStats";
import { useAuth } from "@/src/hooks/auth/AuthContext";
import { AdminLoadingState } from "./util/AdminLoadingState";
import { AdminForbiddenState } from "./util/AdminForbiddenState";
import { AdminSidebar } from "./components/layout/AdminSidebar";
import { AdminShell } from "./components/layout/AdminShell";

export default function AdminSection() {
  const { user, loading } = useAuth();
  const { data, isLoading } = useAdminDashboardStats();

  if (loading || isLoading || !data) {
    return <AdminLoadingState />;
  }

  if (user?.role !== "ADMIN") {
    return <AdminForbiddenState />;
  }

  return (
    <section className="min-h-screen bg-[#fdf0f0]">
      {/* MOBILE → full width */}
      <div className="px-4 py-6 space-y-6 lg:max-w-7xl lg:mx-auto lg:px-8 lg:py-8 lg:space-y-8">
        <StatsRow
          today={data.todayBookings}
          pending={data.pendingReviews}
          income={data.monthlyIncome}
          workers={data.activeWorkers}
        />

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-4 lg:mt-6">
          <div className="flex-1">
            <AdminShell />
          </div>

          <div className="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-neutral-200 pt-6 lg:pt-0 lg:pl-6">
            <AdminSidebar />
          </div>
        </div>
      </div>
    </section>
  );
}
