import { httpClient } from "@/src/lib/http/http-client";
import { BookingService, BookingWorker } from "../../types/booking.types";

export const Step1Api = {
  getServices() {
    return httpClient.request<BookingService[]>("services", "GET");
  },

  getFeaturedServices() {
    return httpClient.request<BookingService[]>("/services/featured", "GET");
  },

  getCategories() {
    return httpClient.request<{ id: string; name: string; image?: string }[]>(
      "category",
      "GET",
    );
  },

  async searchServices(query: string): Promise<BookingService[]> {
    return httpClient.request(
      `/services/search?q=${encodeURIComponent(query)}`,
      "GET",
    );
  },

  getServicesByCategory(categoryId: string) {
    return httpClient.request<BookingService[]>(
      `services/category/${categoryId}`,
      "GET",
    );
  },

  async getWorkersByServices(serviceIds: string[]): Promise<BookingWorker[]> {
    const workers = await httpClient.request<any[]>(
      "/worker/by-services",
      "POST",
      { serviceIds },
    );

    return workers.map((worker) => ({
      id: worker.id,
      name: worker.user?.name ?? "Sin nombre",
      avatar: worker.user?.avatar ?? null,
      categoryIds: worker.categories?.map((c: any) => c.categoryId) ?? [],
    }));
  },
};
