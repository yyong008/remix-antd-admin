import { useNavigate, useParams } from "react-router";

type IOptions = {
  page: number;
  pageSize: number;
};

export function useLoginLogNav() {
  const nav = useNavigate();
  const { lang } = useParams();
  const navLoginLog = (options: IOptions) =>
    nav(
      `/${lang}/admin/system/monitor/login-log?page=${options.page}&pageSize=${options.pageSize}`,
    );
  return [navLoginLog];
}
