import { useParams } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import dayjs from "dayjs";
import dompurify from "dompurify";
import { usePublicNewsById } from "~/api-client/public-news";
import * as m from "~/paraglide/messages.js";

export const meta: MetaFunction = () => {
  return [{ title: m.news_detail_page_title() }];
};

export const loader = async (_args: LoaderFunctionArgs) => {
  return null;
};

function NewsHeader({
  news,
}: {
  news: { title: string; author?: string | null; source?: string | null; publishedAt: string };
}) {
  return (
    <header className="mb-10">
      <h1 className="text-3xl font-bold leading-tight mb-6 text-[clamp(24px,4vw,36px)]">
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

function NewsContent({ content }: { content: string }) {
  return (
    <div
      className="leading-[1.8]"
      dangerouslySetInnerHTML={{ __html: dompurify.sanitize(content || "") }}
    />
  );
}

export default function Route() {
  const { id } = useParams();
  const { data: news, isLoading } = usePublicNewsById(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">{m.common_loading()}</div>
    );
  }

  if (!news) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">{m.news_not_found()}</div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8">
      <article className="max-w-5xl">
        <NewsHeader news={news} />
        <NewsContent content={news.content} />
      </article>
    </div>
  );
}
