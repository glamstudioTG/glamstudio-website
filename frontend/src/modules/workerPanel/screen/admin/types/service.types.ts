export interface Service {
  id: string;
  name: string;
  description?: string;
  duration: number;
  price: number;
  image?: string;
  categoryId: string;
}
