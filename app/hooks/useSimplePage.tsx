import { useEffect, useState } from "react";
import { message } from "antd";
export function useSimplePage(fetch: any) {
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    total: 0,
    list: [],
  });

  const getPage = async () => {
    setIsLoading(true);
    const res = await fetch(page);
    if (res.code !== 0) {
      message.error(res.message);
      setIsLoading(false);
      return;
    }
    setData(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getPage();
  }, [page]);
  return {
    page,
    setPage,
    isLoading,
    setIsLoading,
    data,
    setData,
    getPage,
  };
}
