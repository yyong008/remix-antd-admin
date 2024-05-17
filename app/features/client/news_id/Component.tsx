import { useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";

import dompurify from "dompurify";
import type { loader } from "./loader";

export function Component() {
  const { news } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col pt-[140px] w-[40vw] h-[80vh]">
      <div className="text-[30px]">{news.title}</div>
      <div className="flex text-gray-500 text-[14px] mt-[10px]">
        <div className="mr-[10px]">作者：{news.author}</div>
        <div className="mr-[10px]">来源：{news.source}</div>
        <div>发布时间：{dayjs(news.publishedAt).format("YYYY-MM-DD")}</div>
      </div>
      <div
        className="mt-[20px]"
        dangerouslySetInnerHTML={{
          __html: dompurify.sanitize(news.content),
        }}
      ></div>
    </div>
  );
}