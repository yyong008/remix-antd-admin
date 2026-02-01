export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  code: number;
}

export interface PaginatedData<T> {
  items: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
}

export function success<T>(data?: T, message?: string): ApiResponse<T> {
  return {
    data,
    message: message || "success",
    code: 0,
  };
}

export function fail(message: string, code = 1): ApiResponse<null> {
  return {
    data: null,
    message,
    code,
  };
}

export function paginate<T>(
  items: T[],
  pagination: { page: number; pageSize: number; total: number }
): ApiResponse<PaginatedData<T>> {
  return {
    data: {
      items,
      pagination: {
        ...pagination,
        hasMore: pagination.page * pagination.pageSize < pagination.total,
      },
    },
    message: "success",
    code: 0,
  };
}
