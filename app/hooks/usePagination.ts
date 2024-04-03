import { useLocation } from "@remix-run/react";

export function usePagination() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return {
    page: Number(searchParams.get("page")) || 0,
    pageSize: Number(searchParams.get("pageSize")) || 10,
    current: Number(searchParams.get("page")) || 0,
  };
}
