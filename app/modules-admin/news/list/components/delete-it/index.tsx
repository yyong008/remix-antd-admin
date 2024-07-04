import * as _icon from "@ant-design/icons";

import { Button, Form, Popconfirm, message } from "antd";

import { useDeleteNewsByIdsMutation } from "~/apis-client/admin/news/news";

const { DeleteOutlined } = _icon;

type DeleteItProps = {
  refetch: any;
  record: any;
  title: string;
};

export function DeleteIt({ record, title, refetch }: DeleteItProps) {
  const [deleteIt] = useDeleteNewsByIdsMutation();
  return (
    <Form>
      <Popconfirm
        title={title || "确定要删除吗?"}
        onConfirm={async () => {
          const result = await deleteIt({ ids: [record.id] });
          if (result.data?.code !== 0) {
            message.error(result.data?.message);
            return false;
          }
          message.success(result.data?.message);
          refetch();
          return true;
        }}
      >
        <Button type="link" danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </Form>
  );
}
