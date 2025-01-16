import { NewsContent, NewsHeader } from "./components";

import type { loader } from "./loader";
import { useLoaderData } from "react-router";

export function Route() {
  const _data = useLoaderData<typeof loader>();
  const { data: news } = _data;
  return (
    <div className="flex flex-col pt-[140px] w-[40vw] h-[80vh]">
      <NewsHeader news={news} />
      <NewsContent content={news.content} />
    </div>
  );
}
