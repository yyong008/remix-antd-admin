import dayjs from "dayjs";
import { CalendarOutlined, UserOutlined, FolderOutlined } from "@ant-design/icons";

export function BlogHeader({
  blog,
}: {
  blog: {
    title: string;
    author?: string | null;
    source?: string | null;
    publishedAt: string;
  };
}) {
  return (
    <header style={{ marginBottom: "40px" }}>
      <h1
        style={{
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: 700,
          color: "var(--mkt-text)",
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
          borderBottom: "1px solid var(--mkt-border)",
          paddingBottom: "20px",
        }}
      >
        {blog.author && (
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "var(--mkt-muted)" }}>作者:</span>
            <span style={{ color: "var(--mkt-text)", fontWeight: 500 }}>{blog.author}</span>
          </span>
        )}
        {blog.source && (
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "var(--mkt-muted)" }}>来源:</span>
            <span style={{ color: "var(--mkt-text)" }}>{blog.source}</span>
          </span>
        )}
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "var(--mkt-muted)" }}>发布时间:</span>
          <span style={{ color: "var(--mkt-text)" }}>
            {dayjs(blog.publishedAt).format("YYYY-MM-DD HH:mm")}
          </span>
        </span>
      </div>
    </header>
  );
}
