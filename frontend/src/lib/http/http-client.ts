import { HttpError } from "./http-error";
import { HttpClientConfig, HttpMethod, RequestOptions } from "./http-types";

let isRefreshing = false;
let refreshQueue: Array<() => void> = [];

export class HttpClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor(config: HttpClientConfig) {
    this.baseUrl = config.baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...config.defaultHeaders,
    };
  }

  async request<T>(
    path: string,
    method: HttpMethod,
    body?: unknown,
    options: RequestOptions = {},
  ): Promise<T> {
    try {
      const response = await this.rawRequest(path, method, body, options);
      return this.handleResponse<T>(response);
    } catch (error) {
      if (
        error instanceof HttpError &&
        error.status === 401 &&
        options.auth !== false
      ) {
        return this.handle401<T>(path, method, body, options);
      }

      throw error;
    }
  }

  private async rawRequest(
    path: string,
    method: HttpMethod,
    body?: unknown,
    options: RequestOptions = {},
  ): Promise<Response> {
    const headers = this.buildHeaders(options);

    return fetch(this.buildUrl(path), {
      method,
      headers,
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  private async handle401<T>(
    path: string,
    method: HttpMethod,
    body?: unknown,
    options: RequestOptions = {},
  ): Promise<T> {
    if (options.auth === false) {
      throw Error;
    }
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        await this.refreshToken();
        refreshQueue.forEach((cb) => cb());
        refreshQueue = [];
      } catch {
        refreshQueue = [];
        throw new HttpError(401, "Sesión expirada");
      } finally {
        isRefreshing = false;
      }
    }

    return new Promise<T>((resolve, reject) => {
      refreshQueue.push(async () => {
        try {
          const response = await this.rawRequest(path, method, body, options);
          resolve(await this.handleResponse<T>(response));
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  private async refreshToken(): Promise<void> {
    const response = await fetch(this.buildUrl("/auth/refresh"), {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      window.location.href = "/login";
      throw new Error("Refresh failed");
    }
  }

  private buildHeaders(options: RequestOptions): HeadersInit {
    return {
      ...this.defaultHeaders,
      ...options.headers,
    };
  }

  private buildUrl(path: string): string {
    return `${this.baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const message = await this.extractErrorMessage(response);
      throw new HttpError(response.status, message);
    }

    if (response.status === 204) {
      return null as T;
    }

    return response.json() as Promise<T>;
  }

  private async extractErrorMessage(response: Response): Promise<string> {
    try {
      const data = await response.json();
      return data.message ?? `HTTP Error ${response.status}`;
    } catch {
      return `HTTP Error ${response.status}`;
    }
  }
}

export const httpClient = new HttpClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL!,
});
