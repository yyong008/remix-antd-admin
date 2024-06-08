import { NewsItem } from "./components";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Route() {
  const { news = [] } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col pt-[140px] w-[40vw] h-[80vh]">
      <div>
        {news?.map((n) => {
          return <NewsItem data={n} key={n.id} />;
        })}
      </div>
    </div>
  );
}
