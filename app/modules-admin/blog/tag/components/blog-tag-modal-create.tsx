import { EditOutlined } from "@ant-design/icons";

import { Button, message } from "antd";

import { BlogTagModalForm } from "./blog-tag-modal-form";
import { useCreateBlogTagMutation } from "~/apis-client/admin/blog/tag";

export function BlogTagModalCreate({ refetch }: any) {
  const [createBlogTag] = useCreateBlogTagMutation();
  return (
    <BlogTagModalForm
      title="创建标签"
      trigger={
        <Button type={"primary"} icon={<EditOutlined />}>
          新建
        </Button>
      }
      onOpenChange={() => {}}
      onFinish={async (values: any, form: any) => {
        const result = await createBlogTag(values);
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
