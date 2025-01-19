import { DrawerForm, ProForm } from "@ant-design/pro-components";

import { Button } from "antd";
import { ModalFormItems } from "./ModalFormItems";
import { useMemo } from "react";

type EditBlogFormProps = {
  data: any;
  onFinish: any;
  loading: boolean;
  content: string;
};

export function EditBlogForm(props: EditBlogFormProps) {
  const [form] = ProForm.useForm();
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
    <DrawerForm
      form={form}
      submitter={{
        resetButtonProps: {
          style: {
            display: "none",
          },
        },
      }}
      onOpenChange={() => {
        form.setFieldsValue({
          ...data,
          content: content,
          categoryId: data.categoryId,
        });
      }}
      onFinish={onFinish}
      loading={loading}
      trigger={<Button type="primary">修改博客</Button>}
    >
      <ModalFormItems
        categoriesOptions={categoriesOptions}
        tagsOptions={tagsOptions}
      />
    </DrawerForm>
  );
}
