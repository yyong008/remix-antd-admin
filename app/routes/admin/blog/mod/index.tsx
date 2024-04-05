// type
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json, useLoaderData, useParams } from "@remix-run/react";

// component
import {
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { PageContainer } from "@ant-design/pro-layout";
import { Form } from "antd";
import EditorRichFromItem from "~/components/editor/EditorRichFromItem";

// hooks
import { useFetcherChange } from "~/hooks/useFetcherChange";

// services
import { auth } from "~/services/common/auth.server";
import { getFindNewsCategory } from "~/services/news/news-category";
import { getBlogById, updateBlog } from "~/services/blog/blog";
import { getFindBlogCategory } from "~/services/blog/blog-category";
import { getFindBlogTag } from "~/services/blog/blog-tags";

// utils
import { from, lastValueFrom, map, switchMap } from "rxjs";

// remix:action
export const action = async ({ params, request }: ActionFunctionArgs) => {
  const [userId, redirectToLogin] = await auth({ request, params } as any);

  if (!userId) {
    return redirectToLogin();
  }
  const method = request.method;

  function validate(data: any) {
    try {
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  if (method === "PUT") {
    const update$: any = from(request.json()).pipe(
      map(() => validate(data)),
      map((data) => ({
        ...data,
        userId,
        categoryId: data.newsId,
        publishedAt: data.date,
      })),
      switchMap((data) => updateBlog(data)),
    );

    const data = await lastValueFrom(update$);
    // const data = await request.json();
    // await updateBlog({
    //   ...data,
    //   userId,
    //   categoryId: data.newsId,
    //   publishedAt: data.date,
    // });
    return json({
      code: 0,
      message: "success",
      data: {},
    });
  } else {
    return json({
      code: 1,
      message: "fail",
      data: {},
    });
  }
};

// remix:loader
export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const [userId, redirectToLogin] = await auth({ request, params } as any);

  if (!userId) {
    return redirectToLogin();
  }
  const { id } = params;

  if (id) {
    return json({
      code: 0,
      data: {
        TINYMCE_KEY: process.env.TINYMCE_KEY,
        blogData: await getBlogById(Number(id)),
        categoies: await getFindBlogCategory(),
        tags: await getFindBlogTag(),
      },
      message: "success",
    });
  }

  return json({
    code: 0,
    data: {
      TINYMCE_KEY: process.env.TINYMCE_KEY,
      blogData: {},
      categoies: await getFindNewsCategory(),
      tags: await getFindBlogTag(),
    },
    message: "success",
  });
};

export default function BlotModRoute() {
  const [form] = Form.useForm();
  const fetcher = useFetcherChange();
  const { id } = useParams();
  const { data } = useLoaderData<typeof loader>();
  return (
    <PageContainer>
      <ProCard>
        <ProForm
          initialValues={{
            ...data.blogData,
            date: data.blogData?.publishedAt,
            categoryId: data.blogData.categoryId,
          }}
          onFinish={async (v) => {
            const vals = v;
            fetcher.submit(vals, {
              method: id ? "PUT" : "POST", // 修改或新建
              encType: "application/json",
            });
            return true;
          }}
        >
          <ProFormText
            label="博客标题"
            name="title"
            rules={[
              {
                required: true,
                message: "请输入",
              },
            ]}
          />
          <ProFormText
            label="博客作者"
            name="author"
            rules={[
              {
                required: true,
                message: "请输入",
              },
            ]}
          />
          <ProFormText
            label="博客来源"
            name="source"
            rules={[
              {
                required: true,
                message: "请输入",
              },
            ]}
          />
          <ProFormDateTimePicker
            label="博客发布时间"
            name="date"
            width={"100%"}
            rules={[
              {
                required: true,
                message: "请输入",
              },
            ]}
          />
          <ProFormSelect
            label="分类"
            name="categoryId"
            request={async () => {
              const ncs = data.categoies;
              return ncs?.map((c) => {
                return {
                  label: c.name,
                  value: c.id,
                };
              });
            }}
            rules={[
              {
                required: true,
                message: "请输入",
              },
            ]}
          />
          <ProFormSelect
            label="标签"
            name="tagId"
            request={async () => {
              const ncs = data.tags;
              return ncs?.map((c) => {
                return {
                  label: c.name,
                  value: c.id,
                };
              });
            }}
            rules={[
              {
                required: true,
                message: "请输入",
              },
            ]}
          />
          <ProForm.Item
            label="编写博客"
            name="content"
            rules={[
              {
                required: true,
                message: "请输入",
              },
            ]}
          >
            <EditorRichFromItem form={form} data={data} />
          </ProForm.Item>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
}
