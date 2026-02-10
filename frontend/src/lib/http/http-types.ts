export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEADER";

export interface HttpClientConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
}

export interface RequestOptions {
  auth?: boolean;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
}
