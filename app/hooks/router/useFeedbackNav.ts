import { useNavigate, useParams } from "@remix-run/react";

type IOptions = {
  page?: number;
  pageSize?: number;
  name?: string;
};

/**
 *
 * @param lang 语言
 * @param options 路由导航
 * @returns
 */
export function goFeedbackNav(lang: string, options: IOptions) {
  const name = options.name ? `&name=${options.name}` : "";
  return `/${lang}/admin/docs/feedback?page=${options?.page ?? 1}&pageSize=${options?.pageSize ?? 10}${name}`;
}

/**
 * 钩子函数：导航到 mail list
 * @returns
 */
export function useFeedbackNav() {
  const nav = useNavigate();
  const { lang } = useParams();

  const navFeedback = (options: IOptions) => {
    return nav(goFeedbackNav(lang!, options));
  };
  return [navFeedback];
}
