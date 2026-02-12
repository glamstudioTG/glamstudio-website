export const adminQueryKeys = {
  users: ["admin", "users"] as const,

  transactionProofs: (filters: unknown) =>
    ["admin", "transaction-proofs", filters] as const,

  scheduleBlocks: (date: string) => ["admin", "schedule-blocks", date] as const,

  categories: ["admin", "categories"] as const,

  servicesByCategory: (categoryId: string) =>
    ["admin", "services", categoryId] as const,

  services: (categoryId?: string, search?: string) =>
    ["admin", "services", categoryId ?? "all", search ?? ""] as const,

  servicesBase: ["admin", "services"] as const,

  dashboard: ["admin", "dashboard", "stats"] as const,

  serviceStats: ["admin", "service-stats"] as const, // 👈 ESTA FALTABA

  all: ["admin", "schedule-blocks", "global"] as const,

  byDate: (date: string) =>
    ["admin", "schedule-blocks", "global", date] as const,
};
