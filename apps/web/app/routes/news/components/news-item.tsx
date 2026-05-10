import dayjs from "dayjs";
import { defaultLang } from "~/config/lang";
import { href, useParams } from "react-router";
import relativeTime from "dayjs/plugin/relativeTime";
import { IconCalendar, IconUser, IconFolder, IconChevronRight } from "@tabler/icons-react";

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
      className="flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all hover:shadow-md"
    >
      {categoryName && (
        <div className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full whitespace-nowrap shrink-0">
          <IconFolder className="size-3" />
          {categoryName}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold mb-1 text-sm truncate">{data.title}</h3>
        {excerpt && (
          <p className="text-xs text-muted-foreground truncate m-0">{excerpt}</p>
        )}
      </div>
      <div className="flex items-center gap-3 text-xs shrink-0">
        {data.author && (
          <span className="flex items-center gap-1 max-w-[60px] truncate">
            <IconUser className="size-3" />
            <span className="truncate">{data.author}</span>
          </span>
        )}
        <span className="flex items-center gap-1">
          <IconCalendar className="size-3" />
          {dayjs(data.publishedAt).fromNow()}
        </span>
        <IconChevronRight className="size-3" />
      </div>
    </div>
  );
}
