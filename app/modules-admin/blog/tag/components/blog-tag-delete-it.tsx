import * as ic from "@ant-design/icons";

import { Button, Form, Popconfirm, message } from "antd";

import { useDeleteBlogByIdsMutation } from "~/apis-client/admin/blog/blog";

const { DeleteOutlined } = ic;

type DeleteItProps = {
  refetch: any;
  record: any;
  title: string;
};

export function BlogTagDeleteIt({ refetch, record, title }: DeleteItProps) {
  const [deleteBlogTagByIds] = useDeleteBlogByIdsMutation();
  return (
    <Form>
      <Popconfirm
        title={title || "确定要删除吗?"}
        onConfirm={async () => {
          const data = { ids: [record.id] };
          const result = await deleteBlogTagByIds(data);
          if (result.data.code !== 0) {
            message.error(result.data.message);
            return false;
          }

          message.success(result.data.message);
          refetch();
        }}
      >
        <Button type="link" danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </Form>
  );
}
