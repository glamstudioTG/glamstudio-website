"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthUser } from "./type";
import { AuthApi } from "@/src/service/api/auth.api";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthApi.restoreSession()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const setSession = (user: AuthUser) => {
    setUser(user);
  };

  const logout = async () => {
    await AuthApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setSession,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
