import { href, useParams } from "react-router";
import { defaultLang } from "~/config/lang";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IconCalendar, IconUser, IconFolder } from "@tabler/icons-react";
import { Card, CardContent } from "@workspace/ui/components/card";

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

  return (
    <Card
      className="h-full rounded-xl p-5 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={() => (window.location.href = href(`/:locale?/blog/:id`, { locale, id: data.id }))}
    >
      <CardContent className="p-0 h-full flex flex-col">
        {categoryName && (
          <div className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full mb-3 w-fit">
            <IconFolder className="size-3" />
            {categoryName}
          </div>
        )}
        <h3
          className="font-semibold mb-2 line-clamp-2"
          style={{
            fontSize: featured ? "18px" : "16px",
          }}
        >
          {data.title}
        </h3>
        {excerpt && (
          <p
            className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1"
            style={{
              fontSize: featured ? "14px" : "12px",
            }}
          >
            {excerpt}
          </p>
        )}
        <div
          className="flex items-center gap-4 pt-3 mt-auto"
          style={{
            fontSize: featured ? "13px" : "12px",
          }}
        >
          {data.author && (
            <span className="flex items-center gap-1 max-w-[80px] truncate">
              <IconUser className="size-3" />
              <span>{data.author}</span>
            </span>
          )}
          {data.source && (
            <span className="max-w-[80px] truncate">{data.source}</span>
          )}
          <span className="flex items-center gap-1">
            <IconCalendar className="size-3" />
            {dayjs(data.publishedAt).fromNow()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}