import { useParams } from "react-router";
import { BlogHeader, BlogContent } from "./components";
import { usePublicBlogById } from "~/api-client/queries/public-blog";

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
        加载中...
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
        博客不存在
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
