import { Button, Form, Popconfirm, message } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteBlogCategoryByIdsMutation } from "~/apis-client/admin/blog/category";

type DeleteItProps = {
  record: any;
  title?: string;
  refetch: any;
};

export function BlogCategoryDeleteIt({
  record,
  title,
  refetch,
}: DeleteItProps) {
  const [deleteBlog] = useDeleteBlogCategoryByIdsMutation();
  return (
    <Form>
      <Popconfirm
        title={title || "确定要删除吗?"}
        onConfirm={async () => {
          const data = { ids: [record.id] };

          const result = await deleteBlog(data);

          if (result.data.code === 1) {
            message.error(result.data.message);
            return false;
          }

          message.success(result.data.message);
          refetch();
          return false;
        }}
      >
        <Button type="link" danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </Form>
  );
}
