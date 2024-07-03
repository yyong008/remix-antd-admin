import { BlogTagModalCreate } from "./blog-tag-modal-create";

export const blogTagToolBarRender = (refetch: any) => [
  <BlogTagModalCreate key="tag-modal" refetch={refetch} />,
];
