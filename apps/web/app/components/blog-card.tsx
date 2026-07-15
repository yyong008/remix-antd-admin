import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router";
import { Card, CardContent } from "@workspace/ui/components/card";
import type { Blog } from "~/api-client/public-blog";
import { FolderIcon, UsersIcon, CalendarIcon } from "~/components/icons";
import { BrandPill } from "~/components/brand-pill";

dayjs.extend(relativeTime);

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

interface BlogCardProps {
  data: Blog;
  featured?: boolean;
}

export function BlogCard({ data, featured = false }: BlogCardProps) {
  const excerpt = data.content
    ? stripHtml(data.content).slice(0, featured ? 200 : 120) + "..."
    : "";

  return (
    <Link to={`/blog/${data.id}`} className="group block h-full no-underline">
      <Card
        className={`h-full rounded-xl border-border p-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-border group-hover:shadow-[0_20px_40px_var(--brand-glow)]`}
      >
        <CardContent className="flex h-full flex-col p-5">
          {data.categoryName ? (
            <div className="mb-3">
              <BrandPill icon={<FolderIcon className="size-3" />}>{data.categoryName}</BrandPill>
            </div>
          ) : null}
          <h3
            className={`mb-2 line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-brand-primary ${featured ? "text-lg" : "text-base"}`}
          >
            {data.title}
          </h3>
          {excerpt ? (
            <p
              className={`mb-3 line-clamp-2 flex-1 text-muted-foreground ${featured ? "text-sm" : "text-xs"}`}
            >
              {excerpt}
            </p>
          ) : null}
          <div
            className={`mt-auto flex items-center gap-4 pt-3 text-muted-foreground ${featured ? "text-[13px]" : "text-xs"}`}
          >
            {data.author ? (
              <span className="flex max-w-[80px] items-center gap-1 truncate">
                <UsersIcon className="size-3" />
                <span className="truncate">{data.author}</span>
              </span>
            ) : null}
            {data.source ? <span className="max-w-[80px] truncate">{data.source}</span> : null}
            <span className="flex items-center gap-1">
              <CalendarIcon className="size-3" />
              {dayjs(data.publishedAt).fromNow()}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
