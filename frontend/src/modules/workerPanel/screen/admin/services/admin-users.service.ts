import { httpClient } from "@/src/lib/http/http-client";
import { AdminUser } from "../types/user.types";
import { AdminFoundUser } from "../types/user.types";

export const AdminUsersService = {
  getAll() {
    return httpClient.request<AdminUser[]>("/admin/users/all", "GET");
  },

  changeRole(userId: string, role: "CLIENT" | "WORKER" | "ADMIN") {
    return httpClient.request<void>(
      `/users/admin/users/${userId}/role`,
      "PATCH",
      { role },
    );
  },

  findByEmail(email: string) {
    return httpClient.request<AdminFoundUser[]>(
      `/users/admin/search-by-email/${encodeURIComponent(email)}`,
      "GET",
    );
  },
};
