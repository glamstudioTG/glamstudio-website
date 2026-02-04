export type AuthUser = {
  id: string;
  name: string;
  password?: string;
  email: string;
  phone: string;
  role: string;
};

export type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setSession: (user: AuthUser) => void;
  logout: () => void;
  loading: boolean;
};
