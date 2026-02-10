export type Role = "CLIENT" | "WORKER" | "ADMIN";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  createdAt: string;
}

export type AdminFoundUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};
