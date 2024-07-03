import {
  ProForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";

import { useMemo } from "react";
import { useReadBlogCategoryListQuery } from "@/apis-client/admin/blog/category";
import { useReadBlogTagListQuery } from "@/apis-client/admin/blog/tag";

export function BlogEditForm({
  data,
  onFinish,
  loading,
}: {
  data: any;
  onFinish: any;
  loading: boolean;
}) {
  const { data: categories = {} } = useReadBlogCategoryListQuery({
    page: 1,
    pageSize: 1000,
  });
  const { data: tags = {} } = useReadBlogTagListQuery({
    page: 1,
    pageSize: 1000,
  });

  const categoriesOptions = useMemo(() => {
    return (
      categories?.data?.list?.map((c: any) => {
        return {
          label: c.name,
          value: c.id,
        };
      }) ?? []
    );
  }, [categories]);

  const tagsOptions = useMemo(() => {
    return (
      tags?.data?.list?.map((c: any) => {
        return {
          label: c.name,
          value: c.id,
        };
      }) ?? []
    );
  }, [tags]);

  return (
    <ProForm
      initialValues={{
        ...data,
        categoryId: data.categoryId,
      }}
      submitter={{
        resetButtonProps: {
          style: {
            display: "none",
          },
        },
      }}
      onFinish={onFinish}
      loading={loading}
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
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
        options={categoriesOptions}
      />
      <ProFormSelect
        label="标签"
        name="tagId"
        options={tagsOptions}
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormTextArea
        label="编写博客"
        name="content"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      ></ProFormTextArea>
    </ProForm>
  );
}
