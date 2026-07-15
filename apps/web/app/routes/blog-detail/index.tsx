import { Link, useParams } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import dayjs from "dayjs";
import dompurify from "dompurify";
import { usePublicBlogById } from "~/api-client/public-blog";
import { BrandPill } from "~/components/brand-pill";
import { BrandButton } from "~/components/landings/_shared/brand-button";
import { ArrowLeftIcon, FolderIcon, TagIcon } from "~/components/icons";
import * as m from "~/paraglide/messages.js";

export const meta: MetaFunction = () => {
  return [{ title: m.blog_detail_page_title() }];
};

export const loader = async (_args: LoaderFunctionArgs) => {
  return null;
};

function BlogHeader({
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
      <h1 className="mb-6 text-[clamp(24px,4vw,36px)] font-bold leading-tight text-foreground">
        {blog.title}
      </h1>
      <div className="flex flex-wrap items-center gap-3 border-b border-border pb-5 text-sm">
        {blog.author && (
          <span className="flex items-center gap-1.5">
            <span className="text-muted-foreground">{m.label_author()}</span>
            <span className="font-medium text-foreground">{blog.author}</span>
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <span className="text-muted-foreground">{m.label_published_at()}</span>
          <span className="text-foreground">
            {dayjs(blog.publishedAt).format("YYYY-MM-DD HH:mm")}
          </span>
        </span>
        {blog.categoryName && (
          <BrandPill icon={<FolderIcon className="size-3" />}>{blog.categoryName}</BrandPill>
        )}
        {blog.tagName && (
          <BrandPill variant="solid" icon={<TagIcon className="size-3" />}>
            {blog.tagName}
          </BrandPill>
        )}
      </div>
    </header>
  );
}

function BlogContent({ content }: { content: string }) {
  return (
    <div
      className="leading-[1.9] text-base text-foreground"
      dangerouslySetInnerHTML={{ __html: dompurify.sanitize(content || "") }}
    />
  );
}

export default function Route() {
  const { id } = useParams();
  const { data: blog, isLoading } = usePublicBlogById(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">{m.common_loading()}</div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">{m.blog_not_found()}</div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6">
        <Link to="/blog">
          <BrandButton variant="ghost" size="md" iconLeft={<ArrowLeftIcon className="size-4" />}>
            {m.blog_back_to_list()}
          </BrandButton>
        </Link>
      </div>
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
