import { AuthUser } from "@/src/hooks/auth/type";
import { httpClient } from "@/src/lib/http/http-client";

export const AuthApi = {
  async login(email: string, password: string) {
    await httpClient.request<AuthUser>(
      "/auth/login",
      "POST",
      { email, password },
      { auth: false },
    );

    return this.me();
  },

  register(payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) {
    return httpClient.request("/auth/register", "POST", payload, {
      auth: false,
    });
  },

  logout() {
    return httpClient.request("/auth/logout", "POST");
  },

  async me(): Promise<AuthUser | null> {
    try {
      return await httpClient.request<AuthUser>("/auth/me", "GET");
    } catch {
      return null;
    }
  },

  async refresh(): Promise<boolean> {
    try {
      await httpClient.request("/auth/refresh", "POST", null, {
        auth: false,
      });
      return true;
    } catch {
      return false;
    }
  },

  async restoreSession(): Promise<AuthUser | null> {
    const user = await this.me();
    if (user) return user;

    const refreshed = await this.refresh();
    if (!refreshed) return null;

    return this.me();
  },
};
