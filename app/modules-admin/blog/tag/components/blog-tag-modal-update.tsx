import { EditOutlined } from "@ant-design/icons";

import { Button, message } from "antd";

import { BlogTagModalForm } from "./blog-tag-modal-form";
import { useParams } from "@remix-run/react";
import { useUpdateBlogTagByIdMutation } from "~/apis-client/admin/blog/tag";

export function BlogTagModalUpdate({ record, refetch }: any) {
  const { id } = useParams();
  const [updateBlogTag] = useUpdateBlogTagByIdMutation();
  return (
    <BlogTagModalForm
      title="修改标签"
      onOpenChange={(c: any, form: any) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
        });
      }}
      trigger={<Button type="link" icon={<EditOutlined />}></Button>}
      onFinish={async (values: any, form: any) => {
        const data = values;

        data.categoryId = Number(id);
        data.id = record.id;
        const result = await updateBlogTag(data);
        if (result.data.code !== 0) {
          message.error(result.data.message);
          return false;
        }
        message.success(result.data.message);
        form.resetFields();
        refetch();
        return true;
      }}
    />
  );
}
