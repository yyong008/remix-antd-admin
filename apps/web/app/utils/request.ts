import { config } from "~/config";

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public code: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const result: ApiResponse<T> = await response.json();

  if (result.code !== 0) {
    throw new ApiError(result.message, result.code);
  }

  return result.data;
}

async function request<T>(
  endpoint: string,
  method: string,
  body?: unknown
): Promise<T> {
  const url = `${config.api.baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
  }

  return handleResponse<T>(response);
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  return request<T>(endpoint, "GET");
}

export async function apiPost<T>(endpoint: string, data?: unknown): Promise<T> {
  return request<T>(endpoint, "POST", data);
}

export async function apiPut<T>(endpoint: string, data?: unknown): Promise<T> {
  return request<T>(endpoint, "PUT", data);
}

export async function apiDelete<T>(endpoint: string, data?: unknown): Promise<T> {
  return request<T>(endpoint, "DELETE", data);
}
