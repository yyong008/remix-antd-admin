import { useNavigate, useParams } from "@remix-run/react";

type IOptions = {
  page: number;
  pageSize: number;
};

export function useUserNav() {
  const nav = useNavigate();
  const { lang } = useParams();
  const navUser = (options: IOptions) =>
    nav(
      `/${lang}/admin/system/user?page=${options.page}&pageSize=${options.pageSize}`,
    );
  return [navUser];
}
