export interface Service {
  id: string;
  name: string;
  description?: string;
  category: {
    name: string;
  };
  categoryId: string;
  price: number;
  duration: number;
  image: string;
}

export type ServiceDto = Partial<
  Pick<
    Service,
    "name" | "description" | "categoryId" | "price" | "duration" | "image"
  >
>;
