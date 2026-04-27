import dayjs from "dayjs";
import { FolderOutlined, TagOutlined } from "@ant-design/icons";

export function BlogHeader({
  blog,
}: {
  blog: {
    title: string;
    author?: string | null;
    publishedAt: string;
    categoryName?: string;
    tagName?: string;
  };
}) {
  return (
    <header style={{ marginBottom: "40px" }}>
      <h1
        style={{
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: "24px",
        }}
      >
        {blog.title}
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "16px 24px",
          fontSize: "14px",
          paddingBottom: "20px",
        }}
      >
        {blog.author && (
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span>作者:</span>
            <span style={{ fontWeight: 500 }}>{blog.author}</span>
          </span>
        )}
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span>发布时间:</span>
          <span>{dayjs(blog.publishedAt).format("YYYY-MM-DD HH:mm")}</span>
        </span>
        {blog.categoryName && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 12px",
              borderRadius: "9999px",
              fontSize: "12px",
            }}
          >
            <FolderOutlined />
            {blog.categoryName}
          </span>
        )}
        {blog.tagName && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 12px",
              background: "#6366f1",
              border: "1px solid #6366f1",
              borderRadius: "9999px",
              fontSize: "12px",
              color: "white",
            }}
          >
            <TagOutlined />
            {blog.tagName}
          </span>
        )}
      </div>
    </header>
  );
}
