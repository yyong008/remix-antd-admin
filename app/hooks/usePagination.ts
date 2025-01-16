import { useLocation } from "react-router";
import { useState } from "react";

interface PageState {
  page: number;
  pageSize: number;
}

export function usePage(): [
  PageState,
  React.Dispatch<React.SetStateAction<PageState>>,
] {
  const [page, setPage] = useState<PageState>({
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
