import dayjs from "dayjs";

type BlogHeaderProps = {
  blog: {
    title: string;
    author: string;
    source: string;
    publishedAt: string;
  };
};

export function BlogHeader({ blog }: BlogHeaderProps) {
  return (
    <div className="flex flex-col pt-[140px] w-[40vw] h-[80vh]">
      <div className="text-[30px]">{blog.title}</div>
      <div className="flex text-gray-500 text-[14px] mt-[10px]">
        <div className="mr-[10px]">作者：{blog.author}</div>
        <div className="mr-[10px]">来源：{blog.source}</div>
        <div>发布时间：{dayjs(blog.publishedAt).format("YYYY-MM-DD")}</div>
      </div>
    </div>
  );
}
