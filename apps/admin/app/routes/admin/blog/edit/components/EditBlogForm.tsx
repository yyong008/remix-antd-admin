import { Button, Drawer, Form } from "antd";
import { useState } from "react";

import { ModalFormItems } from "./ModalFormItems";
import { useMemo } from "react";

type EditBlogFormProps = {
  data: any;
  onFinish: any;
  loading: boolean;
  content: string;
};

export function EditBlogForm(props: EditBlogFormProps) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { data, content, onFinish, loading } = props;
  const { data: categories = {} } = { data: { data: { list: [] } } };
  const { data: tags = {} } = { data: { data: { list: [] } } };

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
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        修改博客
      </Button>
      <Drawer title="修改博客" open={open} onClose={() => setOpen(false)} footer={null}>
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            const result = await onFinish(values);
            if (result !== false) {
              setOpen(false);
            }
          }}
          initialValues={{
            ...data,
            content: content,
            categoryId: data.categoryId,
          }}
        >
          <ModalFormItems categoriesOptions={categoriesOptions} tagsOptions={tagsOptions} />
          <Form.Item style={{ marginTop: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
