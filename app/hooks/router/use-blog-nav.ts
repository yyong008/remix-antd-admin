import { useNavigate, useParams } from "@remix-run/react";

type IOptions = {
  page?: number;
  pageSize?: number;
  tag?: number;
  category?: number;
};

export function useBlogNav() {
  const nav = useNavigate();
  const { lang } = useParams();

  const navBlog = (options: IOptions) => {
    const tag = options.tag ? `&tag=${options.tag}` : "";
    const category = options.category ? `&category=${options.category}` : "";
    return nav(
      `/${lang}/admin/blog?page=${options.page}&pageSize=${options.pageSize}${category}${tag}`,
    );
  };
  return [navBlog];
}

export function goBlogNav(lang: string, options?: IOptions) {
  const tag = options?.tag ? `&tag=${options.tag}` : "";
  const category = options?.category ? `&category=${options.category}` : "";
  return `/${lang}/admin/blog?page=${options?.page ?? 1}&pageSize=${options?.pageSize ?? 10}${category}${tag}`;
}
