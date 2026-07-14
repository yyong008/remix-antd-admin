import { useParams } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { BlogHeader, BlogContent } from "./components";
import { usePublicBlogById } from "~/api-client/public-blog";
import * as m from "~/paraglide/messages.js";

export const loader = async (_args: LoaderFunctionArgs) => {
  return null;
};

export function Route() {
  const { id } = useParams();
  const { data: blog, isLoading } = usePublicBlogById(id);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        {m.common_loading()}
      </div>
    );
  }

  if (!blog) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        {m.blog_not_found()}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
      <article>
        <BlogHeader
          blog={{
            title: blog.title,
            author: blog.author,
            publishedAt: blog.publishedAt,
            categoryName: blog.categoryName,
            tagName: blog.tagName,
          }}
        />
        <BlogContent content={blog.content} />
      </article>
    </div>
  );
}
