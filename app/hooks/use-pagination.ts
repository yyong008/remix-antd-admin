import { useLocation } from "@remix-run/react";
import { useState } from "react";

export function usePage() {
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
  });

  return [page, setPage];
}

export function usePagination() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return {
    page: Number(searchParams.get("page")) || 0,
    pageSize: Number(searchParams.get("pageSize")) || 10,
    current: Number(searchParams.get("page")) || 0,
  };
}
