export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: Pagination;
}
