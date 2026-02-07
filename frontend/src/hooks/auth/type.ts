export type AuthUser = {
  id: string;
  name: string;
  password?: string;
  email: string;
  phone: string;
  role: string;
  isWorker: boolean;
  workerId: string | null;
};

export type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setSession: (user: AuthUser) => void;
  logout: () => void;
  loading: boolean;
};
