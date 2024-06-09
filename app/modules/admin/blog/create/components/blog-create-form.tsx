import {
  ProForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";

import EditorRichFromItem from "~/components/editor/editor-rich-from-item";
import { Form } from "antd";
import { useFetcherChange } from "~/hooks";

export function BlogCreateForm({ data, onFinish }: any) {
  const [form] = Form.useForm();
  const fetcher = useFetcherChange();
  return (
    <ProForm
      submitter={{
        resetButtonProps: {
          style: {
            display: "none",
          },
        },
      }}
      onFinish={(value) => onFinish(value, form, fetcher)}
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
  );
}
