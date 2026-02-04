import { AuthUser } from "@/src/hooks/auth/type";
import { httpClient } from "@/src/lib/http/http-client";

export const AuthApi = {
  async login(email: string, password: string) {
    const user = await httpClient.request<AuthUser>(
      "/auth/login",
      "POST",
      { email, password },
      { auth: false },
    );

    return user;
  },

  async register(payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) {
    return httpClient.request("/auth/register", "POST", payload, {
      auth: false,
    });
  },

  async logout() {
    return httpClient.request("/auth/logout", "POST");
  },
};
