import { NewsItem } from "./components";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Route() {
  const _data = useLoaderData<typeof loader>();
  console.log("data", _data);
  const news = _data.data ?? [];
  return (
    <div className="flex flex-col pt-[140px] w-[40vw] h-[80vh]">
      <div>
        {news?.map((n: any) => {
          return <NewsItem data={n} key={n.id} />;
        })}
      </div>
    </div>
  );
}
