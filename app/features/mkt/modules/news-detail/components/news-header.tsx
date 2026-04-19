import dayjs from "dayjs";

export function NewsHeader({
  news,
}: {
  news: {
    title: string;
    author: string;
    source: string;
    publishedAt: string;
  };
}) {
  return (
    <div className="">
      <div className="text-[30px]">{news.title}</div>
      <div className="flex text-gray-500 text-[14px] mt-[10px]">
        <div className="mr-[10px]">作者：{news.author}</div>
        <div className="mr-[10px]">来源：{news.source}</div>
        <div>发布时间：{dayjs(news.publishedAt).format("YYYY-MM-DD")}</div>
      </div>
    </div>
  );
}
