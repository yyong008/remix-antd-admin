import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router";
import { FolderIcon, UsersIcon, CalendarIcon, ChevronRightIcon } from "~/components/icons";
import { BrandPill } from "~/components/brand-pill";
import type { News } from "~/api-client/public-news";

dayjs.extend(relativeTime);

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

interface NewsItemProps {
  data: News;
  categoryName?: string;
}

export function NewsItem({ data, categoryName }: NewsItemProps) {
  const excerpt = data.content ? stripHtml(data.content).slice(0, 120) + "..." : "";

  return (
    <Link
      to={`/news/${data.id}`}
      className="group flex items-center gap-4 rounded-lg border border-transparent p-4 transition-all duration-200 hover:border-brand-border hover:bg-brand-surface hover:shadow-sm"
    >
      {categoryName ? (
        <div className="shrink-0">
          <BrandPill icon={<FolderIcon className="size-3" />}>{categoryName}</BrandPill>
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 truncate text-sm font-semibold text-foreground transition-colors group-hover:text-brand-primary">
          {data.title}
        </h3>
        {excerpt ? <p className="m-0 truncate text-xs text-muted-foreground">{excerpt}</p> : null}
      </div>
      <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
        {data.author ? (
          <span className="flex max-w-[60px] items-center gap-1 truncate">
            <UsersIcon className="size-3" />
            <span className="truncate">{data.author}</span>
          </span>
        ) : null}
        <span className="flex items-center gap-1">
          <CalendarIcon className="size-3" />
          {dayjs(data.publishedAt).fromNow()}
        </span>
        <ChevronRightIcon className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
