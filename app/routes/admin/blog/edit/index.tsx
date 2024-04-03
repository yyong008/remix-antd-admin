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
import { auth, getUserId } from "~/services/common/auth.server";
import { getFindBlogCategory } from "~/services/blog/blog-category";
import { getFindBlogTag } from "~/services/blog/blog-tags";
import { createBlog, updateBlog } from "~/services/blog/blog";

// remix:action
export const action = async ({ params, request }: ActionFunctionArgs) => {
  const [userId, redirectToLogin] = await auth({ request, params } as any);

  if (!userId) {
    return redirectToLogin();
  }
  const { method } = request;

  if (method === "POST") {
    const data = await request.json();
    const userId = await getUserId(request);
    const blog = await createBlog({
      ...data,
      userId,
      publishedAt: data.date,
    });

    return json({
      code: 0,
      data: blog,
      message: "success",
    });
  } else if (method === "PUT") {
    const data = await request.json();
    const userId = await getUserId(request);
    const blog = await updateBlog({
      ...data,
      userId,
      publishedAt: data.date,
    });

    return json({
      code: 0,
      data: blog,
      message: "success",
    });
  }
};

// remix:loader
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const [userId, redirectToLogin] = await auth({ request, params } as any);

  if (!userId) {
    return redirectToLogin();
  }
  return json({
    code: 0,
    message: "success",
    data: {
      TINYMCE_KEY: process.env.TINYMCE_KEY,
      blogCategory: await getFindBlogCategory(),
      blogTag: await getFindBlogTag(),
    },
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
          onFinish={async (v) => {
            const vals = v;
            debugger;
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
              const ncs = data.blogCategory;
              return ncs?.map((c) => {
                return {
                  label: c.name,
                  value: c.id,
                };
              });
            }}
          />
          <ProFormSelect
            label="标签"
            name="tagId"
            request={async () => {
              const ncs = data.blogTag;
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
