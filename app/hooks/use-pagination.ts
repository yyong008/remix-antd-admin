import { useLocation } from "@remix-run/react";
import { useState } from "react";

interface PageState {
  page: number;
  pageSize: number;
}

export function usePage(params: {
  page?: number;
  pageSize?: number;
}): [PageState, React.Dispatch<React.SetStateAction<PageState>>] {
  const [page, setPage] = useState<PageState>({
    page: params.page || 1,
    pageSize: params.pageSize || 10,
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
