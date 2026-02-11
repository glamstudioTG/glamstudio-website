"use client";

import { useState } from "react";
import { useAuth } from "@/src/hooks/auth/AuthContext";
import { useAdminDashboardStats } from "../../hooks/statsAdmin/useAdminDashboardStats";
import { useCategories } from "../../hooks/categories/useGetCategory";
import { useServices } from "../../hooks/services/useGetAllService";

import { AdminLoadingState } from "../../util/AdminLoadingState";
import { AdminForbiddenState } from "../../util/AdminForbiddenState";

import { ServiceManagementHeader } from "./components/header/ServiceManagementHeader";
import { CategorySidebar } from "./components/sidebar/CategorySidebar";
import { ServicesTable } from "./components/table/ServicesTable";

export default function AdminServiceManagmentSection() {
  const { user, loading } = useAuth();
  const { isLoading: statsLoading } = useAdminDashboardStats();

  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(undefined);

  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: services, isLoading: servicesLoading } =
    useServices(selectedCategoryId);
  const { data: allServices } = useServices(undefined);

  if (loading || statsLoading || categoriesLoading || servicesLoading) {
    return <AdminLoadingState />;
  }

  if (user?.role !== "ADMIN") {
    return <AdminForbiddenState />;
  }

  return (
    <section className="h-screen bg-[#fdf0f0] flex flex-col overflow-hidden">
      <div className="px-10 pt-8 pb-6">
        <ServiceManagementHeader />
      </div>

      <div className="flex-1 px-10 pb-8 overflow-hidden">
        <div className="h-full grid grid-cols-[280px_1fr] gap-8">
          <CategorySidebar
            categories={categories ?? []}
            services={allServices ?? []}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
          />

          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm flex flex-col overflow-hidden">
            <ServicesTable services={services ?? []} />
          </div>
        </div>
      </div>
    </section>
  );
}
