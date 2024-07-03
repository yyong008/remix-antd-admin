import * as ic from "@ant-design/icons";

import { Button, message } from "antd";

import BlogCategoryModalForm from "./blog-category-modal-form";
import { useCreateBlogCategoryMutation } from "~/apis-client/admin/blog/category";

const { EditOutlined } = ic;

export function BlogCategoryModalCreate({ refetch }: any) {
  const [createBlogCategory, other] = useCreateBlogCategoryMutation();
  return (
    <BlogCategoryModalForm
      loading={other.isLoading}
      title="创建分类"
      trigger={
        <Button type="primary" icon={<EditOutlined />}>
          新建
        </Button>
      }
      onOpenChange={() => {}}
      onFinish={async (values: any, form: any) => {
        const data = {
          ...values,
        };
        const result = await createBlogCategory(data);
        if (result.data.code === 1) {
          message.error(result.data.message);
          return false;
        }
        message.success(result.data.message);
        refetch();
        form.resetFields();
        return true;
      }}
    />
  );
}
