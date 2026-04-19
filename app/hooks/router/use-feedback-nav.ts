import { useNavigate, useParams } from "react-router";

type IOptions = {
  page?: number;
  pageSize?: number;
  name?: string;
};

export function goFeedbackNav(lang: string, options: IOptions) {
  const name = options.name ? `&name=${options.name}` : "";
  return `/${lang}/admin/docs/feedback?page=${options?.page ?? 1}&pageSize=${options?.pageSize ?? 10}${name}`;
}

export function useFeedbackNav() {
  const nav = useNavigate();
  const { lang } = useParams();

  const navFeedback = (options: IOptions) => {
    return nav(goFeedbackNav(lang!, options));
  };
  return [navFeedback];
}
