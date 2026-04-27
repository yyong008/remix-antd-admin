import { href, useParams } from "react-router";
import { defaultLang } from "~/config/lang";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CalendarOutlined, UserOutlined, FolderOutlined } from "@ant-design/icons";
import { Card } from "antd";

dayjs.extend(relativeTime);

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function BlogItem(props: { data: any; featured?: boolean; categoryName?: string }) {
  const { data, featured = false, categoryName } = props;
  const { locale: localeParam } = useParams();
  const locale = localeParam ?? defaultLang;
  const excerpt = data.content
    ? stripHtml(data.content).slice(0, featured ? 200 : 120) + "..."
    : "";

  const cardStyle: React.CSSProperties = {
    borderRadius: "12px",
    padding: "20px",
    height: "100%",
    transition: "all 0.3s",
  };

  return (
    <Card
      style={cardStyle}
      bodyStyle={{ padding: 0, height: "100%", display: "flex", flexDirection: "column" }}
      hoverable
      onClick={() => (window.location.href = href(`/:locale?/blog/:id`, { locale, id: data.id }))}
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {categoryName && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              padding: "4px 8px",
              borderRadius: "9999px",
              marginBottom: "12px",
              width: "fit-content",
            }}
          >
            <FolderOutlined />
            {categoryName}
          </div>
        )}
        <h3
          style={{
            fontWeight: 600,
            marginBottom: "8px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            fontSize: featured ? "18px" : "16px",
          }}
        >
          {data.title}
        </h3>
        {excerpt && (
          <p
            style={{
              marginBottom: "12px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              fontSize: featured ? "14px" : "12px",
              flex: 1,
            }}
          >
            {excerpt}
          </p>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "auto",
            paddingTop: "12px",
            fontSize: featured ? "13px" : "12px",
          }}
        >
          {data.author && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                maxWidth: "80px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <UserOutlined />
              <span>{data.author}</span>
            </span>
          )}
          {data.source && (
            <span
              style={{
                maxWidth: "80px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {data.source}
            </span>
          )}
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <CalendarOutlined />
            {dayjs(data.publishedAt).fromNow()}
          </span>
        </div>
      </div>
    </Card>
  );
}
