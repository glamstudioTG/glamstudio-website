import { tokenService } from "../token/token.service";
import { HttpError } from "./http-error";
import { HttpClientConfig, HttpMethod, RequestOptions } from "./http-types";

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
    const headers = this.buildHeaders(options);

    const response = await fetch(this.buildUrl(path), {
      method,
      headers,
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse<T>(response);
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
