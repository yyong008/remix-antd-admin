import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import { lastValueFrom } from "rxjs";
import { getNewsById$ } from "~/server/services/news/news";
import dompurify from "dompurify";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({
    code: 0,
    message: "success",
    news: await lastValueFrom(getNewsById$(Number(params.id!))),
  });
};

export default function NewsDetailWithIdPage() {
  const { news } = useLoaderData<typeof loader>();
  console.log(news);
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
