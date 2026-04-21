import { useNavigate, useParams } from "react-router";

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
    const tag = options.tag ? `&tagId=${options.tag}` : "";
    const category = options.category ? `&categoryId=${options.category}` : "";
    return nav(
      `/${lang}/admin/blog/list?page=${options.page ?? 1}&pageSize=${options.pageSize ?? 10}${category}${tag}`,
    );
  };
  return [navBlog];
}

export function goBlogNav(lang: string, options?: IOptions) {
  const tag = options?.tag ? `&tagId=${options.tag}` : "";
  const category = options?.category ? `&categoryId=${options.category}` : "";
  return `/${lang}/admin/blog/list?page=${options?.page ?? 1}&pageSize=${options?.pageSize ?? 10}${category}${tag}`;
}
