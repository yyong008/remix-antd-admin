import dayjs from "dayjs";
import { IconFolder, IconTag } from "@tabler/icons-react";
import * as m from "~/paraglide/messages.js";

export function BlogHeader({
  blog,
}: {
  blog: {
    title: string;
    author?: string | null;
    publishedAt: string;
    categoryName?: string;
    tagName?: string;
  };
}) {
  return (
    <header className="mb-10">
      <h1
        className="text-3xl font-bold leading-tight mb-6"
        style={{ fontSize: "clamp(24px, 4vw, 36px)" }}
      >
        {blog.title}
      </h1>
      <div className="flex flex-wrap items-center gap-4 text-sm pb-5">
        {blog.author && (
          <span className="flex items-center gap-1.5">
            <span className="text-muted-foreground">{m.label_author()}</span>
            <span className="font-medium">{blog.author}</span>
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <span className="text-muted-foreground">{m.label_published_at()}</span>
          <span>{dayjs(blog.publishedAt).format("YYYY-MM-DD HH:mm")}</span>
        </span>
        {blog.categoryName && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs">
            <IconFolder className="size-3" />
            {blog.categoryName}
          </span>
        )}
        {blog.tagName && (
          <span
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs text-white"
            style={{ background: "#6366f1" }}
          >
            <IconTag className="size-3" />
            {blog.tagName}
          </span>
        )}
      </div>
    </header>
  );
}