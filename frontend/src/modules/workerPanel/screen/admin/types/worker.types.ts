export interface AdminWorker {
  id: string;
  isActive: boolean;
  deactivatedAt?: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
