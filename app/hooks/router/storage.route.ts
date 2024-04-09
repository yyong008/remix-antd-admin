import { useNavigate, useParams } from "@remix-run/react";

type IOptions = {
  page: number;
  pageSize: number;
};

export function useStorageNav() {
  const nav = useNavigate();
  const { lang } = useParams();
  const navStorage = (options: IOptions) =>
    nav(
      `/${lang}/admin/tools/storage?page=${options.page}&pageSize=${options.pageSize}`,
    );
  return [navStorage];
}
