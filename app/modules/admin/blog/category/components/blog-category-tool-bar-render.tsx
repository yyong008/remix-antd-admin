import { type FetcherWithComponents } from "@remix-run/react";
import { BlogCategoryModalCreate } from "./blog-category-modal-create";

export const createBlogCategoryToolBarRender = (
  fetcher: FetcherWithComponents<any>,
) => {
  return [
    <BlogCategoryModalCreate
      fetcher={fetcher}
      key="blog-category-modal-create"
    />,
  ];
};
