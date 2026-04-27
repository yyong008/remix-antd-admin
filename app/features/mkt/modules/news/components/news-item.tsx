import { href, useParams } from "react-router";
import { defaultLang } from "~/config/lang";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CalendarOutlined, UserOutlined, FolderOutlined, RightOutlined } from "@ant-design/icons";

dayjs.extend(relativeTime);

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function NewsItem(props: { data: any; categoryName?: string }) {
  const { data, categoryName } = props;
  const { locale: localeParam } = useParams();
  const locale = localeParam ?? defaultLang;
  const excerpt = data.content ? stripHtml(data.content).slice(0, 120) + "..." : "";

  return (
    <div
      onClick={() => (window.location.href = href(`/:locale?/news/:id`, { locale, id: data.id }))}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px 20px",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(102, 126, 234, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {categoryName && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "12px",
            padding: "4px 10px",
            borderRadius: "9999px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <FolderOutlined />
          {categoryName}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3
          style={{
            fontWeight: 600,
            marginBottom: "4px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "15px",
          }}
        >
          {data.title}
        </h3>
        {excerpt && (
          <p
            style={{
              fontSize: "13px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              margin: 0,
            }}
          >
            {excerpt}
          </p>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "12px",
          flexShrink: 0,
        }}
      >
        {data.author && (
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <UserOutlined />
            <span
              style={{
                maxWidth: "60px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {data.author}
            </span>
          </span>
        )}
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <CalendarOutlined />
          {dayjs(data.publishedAt).fromNow()}
        </span>
        <RightOutlined style={{ fontSize: "10px" }} />
      </div>
    </div>
  );
}
