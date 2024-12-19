import { Button, message } from "antd";

import BlogCategoryModalForm from "./blog-category-modal-form";
import { EditOutlined } from "@ant-design/icons";
import { useParams } from "@remix-run/react";
import { useUpdateBlogCategoryByIdMutation } from "~/apis-client/admin/blog/category";

export default function BlogCategoryModalUpdate({ record, refetch }: any) {
  const { id } = useParams();
  const [updateBlogCategory, other] = useUpdateBlogCategoryByIdMutation();

  return (
    <BlogCategoryModalForm
      loding={other.isLoading}
      title="修改分类"
      onOpenChange={(c: any, form: any) => {
        form.setFieldsValue({
          ...record,
        });
      }}
      trigger={<Button type={"link"} icon={<EditOutlined />} />}
      onFinish={async (values: any, form: any) => {
        const data = {
          ...values,
        };
        data.categoryId = Number(id);
        data.id = record.id;
        const result = await updateBlogCategory(data);
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
