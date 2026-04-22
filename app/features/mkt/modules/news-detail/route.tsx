import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { NewsContent, NewsHeader } from "./components";
import { usePublicNewsById } from "~/api-client/queries/public-news";

export function Route() {
  const { id } = useParams();
  const { data: news, isLoading } = usePublicNewsById(id);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          color: "var(--mkt-muted)",
        }}
      >
        加载中...
      </div>
    );
  }

  if (!news) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          color: "var(--mkt-muted)",
        }}
      >
        新闻不存在
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
      <article>
        <NewsHeader news={news} />
        <NewsContent content={news.content} />
      </article>
    </div>
  );
}
