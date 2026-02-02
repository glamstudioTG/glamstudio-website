"use client";

import { useMemo, useState } from "react";
import {
  useCategoriesQuery,
  useServicesByCategoryQuery,
  useGetServicesQuery,
  useFeaturedServicesQuery,
} from "../../../hooks/query/step1.queries";
import ServiceList from "./ServiceList";
import ServiceFilters from "./serviceFilter";
import { BookingForm, BookingService } from "../../../types/booking.types";
import { ServiceFilter } from "./types";
import { ServiceListSkeleton, ServiceWorkerSkeleton } from "./loading";
interface Props {
  booking: BookingForm;
}

export default function ServiceBrowser({ booking }: Props) {
  const [filter, setFilter] = useState<ServiceFilter>({ type: "featured" });

  const { data: allServices, isLoading: loadingAllServices } =
    useGetServicesQuery();

  const { data: featured, isLoading: loadingFeatured } =
    useFeaturedServicesQuery();

  const { data: categories = [], isLoading: loadingCategories } =
    useCategoriesQuery();

  const categoryId = filter.type === "category" ? filter.categoryId : null;

  const { data: services = [], isLoading: loadingServices } =
    useServicesByCategoryQuery(categoryId);

  const filteredServices = useMemo<BookingService[]>(() => {
    if (filter.type === "all") {
      return allServices ?? [];
    }

    if (filter.type === "featured") {
      return featured ?? [];
    }

    return services;
  }, [filter, allServices, services]);

  const isLoading =
    filter.type === "category" ? loadingServices : loadingAllServices;

  if (loadingCategories) {
    return <ServiceListSkeleton />;
  }

  if (loadingFeatured) {
    return <ServiceListSkeleton />;
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <ServiceFilters
          value={filter}
          categories={categories}
          onChange={setFilter}
        />

        <ServiceListSkeleton count={3} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ServiceFilters
        value={filter}
        categories={categories}
        onChange={setFilter}
      />

      {filteredServices.length > 0 && (
        <ServiceList booking={booking} services={filteredServices} />
      )}
    </div>
  );
}
