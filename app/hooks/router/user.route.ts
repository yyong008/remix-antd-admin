import { useNavigate, useParams } from "@remix-run/react";
import { ADMIN_ROUTE_PREFIX } from "~/constants";

type IOptions = {
  page: number;
  pageSize: number;
};

export function useUserNav() {
  const nav = useNavigate();
  const { lang } = useParams();
  const navUser = (options: IOptions) =>
    nav(
      `/${lang}/${ADMIN_ROUTE_PREFIX}/system/user?page=${options.page}&pageSize=${options.pageSize}`,
    );
  return [navUser];
}
