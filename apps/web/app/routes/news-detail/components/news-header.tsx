import dayjs from "dayjs";
import * as m from "~/paraglide/messages.js";

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
    <header className="mb-10">
      <h1
        className="text-3xl font-bold leading-tight mb-6"
        style={{ fontSize: "clamp(24px, 4vw, 36px)" }}
      >
        {news.title}
      </h1>
      <div className="flex flex-wrap items-center gap-4 text-sm pb-5">
        {news.author && (
          <span className="flex items-center gap-1.5">
            <span className="text-muted-foreground">{m.label_author()}</span>
            <span className="font-medium">{news.author}</span>
          </span>
        )}
        {news.source && (
          <span className="flex items-center gap-1.5">
            <span className="text-muted-foreground">{m.label_source()}</span>
            <span>{news.source}</span>
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <span className="text-muted-foreground">{m.label_published_at()}</span>
          <span>{dayjs(news.publishedAt).format("YYYY-MM-DD HH:mm")}</span>
        </span>
      </div>
    </header>
  );
}