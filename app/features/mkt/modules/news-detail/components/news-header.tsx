import dayjs from "dayjs";

export function NewsHeader({
  news,
}: {
  news: {
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
          lineHeight: 1.2,
          marginBottom: "24px",
        }}
      >
        {news.title}
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
        {news.author && (
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span>作者:</span>
            <span style={{ fontWeight: 500 }}>{news.author}</span>
          </span>
        )}
        {news.source && (
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span>来源:</span>
            <span>{news.source}</span>
          </span>
        )}
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span>发布时间:</span>
          <span>{dayjs(news.publishedAt).format("YYYY-MM-DD HH:mm")}</span>
        </span>
      </div>
    </header>
  );
}
