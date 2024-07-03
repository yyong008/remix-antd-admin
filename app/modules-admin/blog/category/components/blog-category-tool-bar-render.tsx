import { BlogCategoryModalCreate } from "./blog-category-modal-create";

export const createBlogCategoryToolBarRender = (refetch: any) => {
  return [
    <BlogCategoryModalCreate
      refetch={refetch}
      key="blog-category-modal-create"
    />,
  ];
};
