export interface CategoryTypesData {
  id: string;
  name: string;
  description: string;
  image: string;
  services: ServicetypesData[];
}

export interface ServicetypesData {
  id: string;
  name: string;
  description: string;
  image: string;
  duration: number;
  price: number;
  categoryId: string;
}
