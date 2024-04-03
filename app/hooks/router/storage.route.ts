import { useNavigate, useParams } from "@remix-run/react";
import { ADMIN_ROUTE_PREFIX } from "~/constants";

type IOptions = {
  page: number;
  pageSize: number;
};

export function useStorageNav() {
  const nav = useNavigate();
  const { lang } = useParams();
  const navStorage = (options: IOptions) =>
    nav(
      `/${lang}/${ADMIN_ROUTE_PREFIX}/tools/storage?page=${options.page}&pageSize=${options.pageSize}`,
    );
  return [navStorage];
}
