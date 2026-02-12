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
import { useDebounce } from "./components/table/debounced";

export default function AdminServiceManagmentSection() {
  const { user, loading } = useAuth();
  const { isLoading: statsLoading } = useAdminDashboardStats();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(undefined);

  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const { data: services, isLoading: servicesLoading } = useServices(
    selectedCategoryId,
    debouncedSearch,
  );

  const { data: allServices } = useServices(undefined);

  if (loading || statsLoading || categoriesLoading || servicesLoading) {
    return <AdminLoadingState />;
  }

  if (user?.role !== "ADMIN") {
    return <AdminForbiddenState />;
  }

  return (
    <section className="bg-[#fdf0f0] flex flex-col min-h-screen lg:h-screen">
      {/* HEADER */}
      <div className="px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 pb-4 sm:pb-6">
        <ServiceManagementHeader />
      </div>

      {/* BODY */}
      <div className="flex-1 px-4 sm:px-6 lg:px-10 pb-6 sm:pb-8 min-h-0">
        <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 h-full min-h-0">
          {/* SIDEBAR */}
          <div className="lg:h-full">
            <CategorySidebar
              categories={categories ?? []}
              services={allServices ?? []}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
            />
          </div>

          {/* TABLE CONTAINER */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm flex flex-col h-full min-h-0">
            <ServicesTable
              services={services ?? []}
              onSearchChange={setSearch}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
