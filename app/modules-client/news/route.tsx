import { NewsItem } from "./components";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Route() {
  const _data = useLoaderData<typeof loader>();
  const news = _data.data?.list ?? [];
  return (
    <div className="flex flex-col pt-[140px] w-[40vw] h-[80vh]">
      <div>
        {news?.map((n: any) => {
          return <NewsItem data={n} key={n.id} />;
        })}
      </div>
      <div className="flex justify-center text-gray-500">
        {news.length <= 0 ? <div>暂无数据</div> : null}
      </div>
    </div>
  );
}
