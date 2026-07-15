import { Link, useParams } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import dayjs from "dayjs";
import dompurify from "dompurify";
import { usePublicNewsById } from "~/api-client/public-news";
import { BrandButton } from "~/components/landings/_shared/brand-button";
import { ArrowLeftIcon } from "~/components/icons";
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
      <h1 className="mb-6 text-[clamp(24px,4vw,36px)] font-bold leading-tight text-foreground">
        {news.title}
      </h1>
      <div className="flex flex-wrap items-center gap-3 border-b border-border pb-5 text-sm">
        {news.author && (
          <span className="flex items-center gap-1.5">
            <span className="text-muted-foreground">{m.label_author()}</span>
            <span className="font-medium text-foreground">{news.author}</span>
          </span>
        )}
        {news.source && (
          <span className="flex items-center gap-1.5">
            <span className="text-muted-foreground">{m.label_source()}</span>
            <span className="text-foreground">{news.source}</span>
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <span className="text-muted-foreground">{m.label_published_at()}</span>
          <span className="text-foreground">
            {dayjs(news.publishedAt).format("YYYY-MM-DD HH:mm")}
          </span>
        </span>
      </div>
    </header>
  );
}

function NewsContent({ content }: { content: string }) {
  return (
    <div
      className="leading-[1.8] text-foreground"
      dangerouslySetInnerHTML={{ __html: dompurify.sanitize(content || "") }}
    />
  );
}

export default function Route() {
  const { id } = useParams();
  const { data: news, isLoading } = usePublicNewsById(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">{m.common_loading()}</div>
    );
  }

  if (!news) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">{m.news_not_found()}</div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6">
        <Link to="/news">
          <BrandButton variant="ghost" size="md" iconLeft={<ArrowLeftIcon className="size-4" />}>
            {m.news_back_to_list()}
          </BrandButton>
        </Link>
      </div>
      <article className="max-w-5xl">
        <NewsHeader news={news} />
        <NewsContent content={news.content} />
      </article>
    </div>
  );
}
