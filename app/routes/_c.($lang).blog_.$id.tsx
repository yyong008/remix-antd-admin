import { type LoaderFunctionArgs } from "@remix-run/node";

import { json } from "@remix-run/node";

// remix
import { useLoaderData } from "@remix-run/react";

import dayjs from "dayjs";
import { lastValueFrom } from "rxjs";
import dompurify from "dompurify";

// services
import { getBlogById$ } from "~/server/services/blog/blog";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({
    code: 0,
    message: "success",
    blog: (await lastValueFrom(getBlogById$(Number(params.id!))))!,
  });
};

export default function BlogDetailWithIdPage() {
  const { blog } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col pt-[140px] w-[40vw] h-[80vh]">
      <div className="text-[30px]">{blog.title}</div>
      <div className="flex text-gray-500 text-[14px] mt-[10px]">
        <div className="mr-[10px]">作者：{blog.author}</div>
        <div className="mr-[10px]">来源：{blog.source}</div>
        <div>发布时间：{dayjs(blog.publishedAt).format("YYYY-MM-DD")}</div>
      </div>
      <div
        className="mt-[20px]"
        dangerouslySetInnerHTML={{
          __html: dompurify.sanitize(blog.content),
        }}
      ></div>
    </div>
  );
}