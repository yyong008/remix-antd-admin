import { useParams } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { NewsContent, NewsHeader } from "./components";
import { usePublicNewsById } from "~/api-client/public-news";
import * as m from "~/paraglide/messages.js";

export const loader = async (_args: LoaderFunctionArgs) => {
  return null;
};

export function Route() {
  const { id } = useParams();
  const { data: news, isLoading } = usePublicNewsById(id);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        {m.common_loading()}
      </div>
    );
  }

  if (!news) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        {m.news_not_found()}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
      <article className="max-w-5xl">
        <NewsHeader news={news} />
        <NewsContent content={news.content} />
      </article>
    </div>
  );
}
