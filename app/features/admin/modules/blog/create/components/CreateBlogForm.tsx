import { Button, message } from "antd";
import { DrawerForm, ProForm } from "@ant-design/pro-components";
import { useNavigate, useParams } from "react-router";

import { ModalFormItems } from "./ModalFormItems";
import { useMemo } from "react";

export function CreateBlogForm(props: { content: string }) {
  const [form] = ProForm.useForm();
  const nav = useNavigate();
  const { lang } = useParams();
  const [createBlog, others] = [
    (...args: any): any => {},
    { isLoading: false },
  ];
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
    nav(`/${lang}/admin/blog/result`, {
      state: { title: v.title, id: result.data.data.id },
    });
    return true;
  };
  return (
    <DrawerForm
      form={form}
      title="创建博客"
      submitter={{
        resetButtonProps: {
          style: {
            display: "none",
          },
        },
      }}
      onOpenChange={(open) => {
        form.setFieldsValue({
          content: props.content,
        });
      }}
      onFinish={onFinish}
      loading={others.isLoading}
      trigger={<Button type="primary">创建博客</Button>}
    >
      <ModalFormItems
        categoriesOptions={categoriesOptions}
        tagsOptions={tagsOptions}
      />
    </DrawerForm>
  );
}
