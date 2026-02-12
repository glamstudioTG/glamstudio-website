export interface WorkerCategoryRelation {
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
}

export interface WorkerUser {
  id: string;
  name: string;
  email?: string;
}

export interface Worker {
  id: string;
  bio?: string | null;
  avatar?: string | null;
  isActive: boolean;
  user: WorkerUser;
  categories: WorkerCategoryRelation[];
}
