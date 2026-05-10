import { Button, Drawer, Form, message } from "antd";
import { href, useNavigate, useParams } from "react-router";
import { useState } from "react";

import { ModalFormItems } from "./ModalFormItems";
import { useMemo } from "react";

export function CreateBlogForm(props: {
  content: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = props.open ?? internalOpen;
  const setOpen = props.setOpen ?? setInternalOpen;
  const [form] = Form.useForm();
  const nav = useNavigate();
  const { locale } = useParams();
  const [createBlog, others] = [(...args: any): any => {}, { isLoading: false }];
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

  const onFinish = async (v: any) => {
    const result: any = await createBlog(v);
    if (result.data?.code !== 0) {
      message.error(result.data?.message);
      return false;
    }

    message.success(result.data?.message);
    nav(href("/:locale?/admin/blog/result", { locale }), {
      state: { title: v.title, id: result.data.data.id },
    });
    return true;
  };
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        创建博客
      </Button>
      <Drawer title="创建博客" open={open} onClose={() => setOpen(false)} footer={null}>
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
            content: props.content,
          }}
        >
          <ModalFormItems categoriesOptions={categoriesOptions} tagsOptions={tagsOptions} />
          <Form.Item style={{ marginTop: 16 }}>
            <Button type="primary" htmlType="submit" loading={others.isLoading}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
