import { Button } from "antd";
import { DrawerForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItems";
import { useMemo } from "react";
import { useReadBlogCategoryListQuery } from "@/apis-client/admin/blog/category";
import { useReadBlogTagListQuery } from "@/apis-client/admin/blog/tag";

type EditBlogFormProps = {
  data: any;
  onFinish: any;
  loading: boolean;
};

export function EditBlogForm(props: EditBlogFormProps) {
  const { data, onFinish, loading } = props;
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
    <DrawerForm
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
      trigger={<Button type="primary">修改博客</Button>}
    >
      <ModalFormItems
        categoriesOptions={categoriesOptions}
        tagsOptions={tagsOptions}
      />
    </DrawerForm>
  );
}
