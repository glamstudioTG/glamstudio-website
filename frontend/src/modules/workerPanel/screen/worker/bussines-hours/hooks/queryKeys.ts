export const adminQueryKeys = {
  worker: (workerId: string) => ["admin", "worker", workerId] as const,

  categories: ["admin", "categories"] as const,
};
