import { useParams } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import dayjs from "dayjs";
import dompurify from "dompurify";
import { IconFolder, IconTag } from "@tabler/icons-react";
import { usePublicBlogById } from "~/api-client/public-blog";
import * as m from "~/paraglide/messages.js";

export const meta: MetaFunction = () => {
  return [{ title: m.blog_detail_page_title() }];
};

export const loader = async (_args: LoaderFunctionArgs) => {
  return null;
};

function BlogHeader({ blog }: { blog: { title: string; author?: string | null; publishedAt: string; categoryName?: string; tagName?: string } }) {
  return (
    <header className="mb-10">
      <h1 className="text-3xl font-bold leading-tight mb-6 text-[clamp(24px,4vw,36px)]">
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
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs text-white bg-indigo-500">
            <IconTag className="size-3" />
            {blog.tagName}
          </span>
        )}
      </div>
    </header>
  );
}

function BlogContent({ content }: { content: string }) {
  return (
    <div className="leading-[1.9] text-base"
      dangerouslySetInnerHTML={{ __html: dompurify.sanitize(content || "") }}
    />
  );
}

export default function Route() {
  const { id } = useParams();
  const { data: blog, isLoading } = usePublicBlogById(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        {m.common_loading()}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        {m.blog_not_found()}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8">
      <article>
        <BlogHeader
          blog={{
            title: blog.title,
            author: blog.author,
            publishedAt: blog.publishedAt,
            categoryName: blog.categoryName,
            tagName: blog.tagName,
          }}
        />
        <BlogContent content={blog.content} />
      </article>
    </div>
  );
}
