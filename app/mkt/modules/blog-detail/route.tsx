import { BlogContent, BlogHeader } from "./components";

import { Layout } from "./layout";
import type { loader } from "./loader";
import { useLoaderData } from "react-router";

export function Route() {
  const _data = useLoaderData<typeof loader>();
  const blog = _data.data;
  return (
    <Layout>
      <BlogHeader blog={blog} />
      <BlogContent content={blog.content} />
    </Layout>
  );
}
