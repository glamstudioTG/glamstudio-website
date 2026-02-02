export type ServiceFilter =
  | { type: "all" }
  | { type: "featured" }
  | { type: "category"; categoryId: string };
