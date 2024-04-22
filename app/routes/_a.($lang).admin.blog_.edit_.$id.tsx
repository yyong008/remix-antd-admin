// type
import type { ActionFunction, LoaderFunction } from "@remix-run/node";

// remix
import { useLoaderData, useParams } from "@remix-run/react";

// component
import {
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Form } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import EditorRichFromItem from "~/components/editor/EditorRichFromItem";

// hooks
import { useFetcherChange } from "~/hooks";

// controllers
import { AdminBlogEditWithIdController } from "~/server/controllers/admin.blog.edit.$id.controller";

// remix:action-loader
export const action: ActionFunction = AdminBlogEditWithIdController.action;
export const loader: LoaderFunction = AdminBlogEditWithIdController.loader;

export default function BlotModWithIdRoute() {
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
            categoryId: data.blogData.categoryId,
          }}
          submitter={{
            resetButtonProps: {
              style: {
                // Hide the reset button
                display: "none",
              },
            },
          }}
          onFinish={async (v) => {
            const vals = v;
            if (id) vals.id = Number(id);
            fetcher.submit(vals, {
              method: id ? "PUT" : "POST", // 修改或新建
              encType: "application/json",
            });
            form.resetFields();
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
            name="publishedAt"
            width={"100%" as any}
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
              return ncs?.map((c: any) => {
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
              return ncs?.map((c: any) => {
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
