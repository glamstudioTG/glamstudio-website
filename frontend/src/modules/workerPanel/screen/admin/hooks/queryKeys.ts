export const adminQueryKeys = {
  users: ["admin", "users"] as const,
  transactionProofs: (filters: unknown) =>
    ["admin", "transaction-proofs", filters] as const,
  scheduleBlocks: (date: string) => ["admin", "schedule-blocks", date] as const,
  categories: ["admin", "categories"] as const,
  servicesByCategory: (categoryId: string) =>
    ["admin", "services", categoryId] as const,
  all: ["admin", "schedule-blocks", "global"] as const,
  byDate: (date: string) =>
    ["admin", "schedule-blocks", "global", date] as const,
};
