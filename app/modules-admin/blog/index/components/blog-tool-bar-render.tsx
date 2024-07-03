import { ButtonLink } from "~/components/common";

export const createBlogCategoryToolBarRender = (lang: string) => {
  return [
    <ButtonLink
      key="tag-modal"
      to={`/${lang}/admin/blog/edit`}
      type={"new"}
      content="新建"
    />,
  ];
};
