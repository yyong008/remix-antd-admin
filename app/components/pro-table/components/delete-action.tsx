import * as _icon from "@ant-design/icons";

import { Button, Form, Popconfirm, message } from "antd";

const { DeleteOutlined } = _icon;

type DeleteItProps = {
  refetch: any;
  title?: string;
  deleteHandler: (...args: any) => any;
};

export function PTableDeleteAction({
  title,
  refetch,
  deleteHandler,
}: DeleteItProps) {
  return (
    <Form>
      <Popconfirm
        title={title || "确定要删除吗?"}
        onConfirm={async () => {
          const result = await deleteHandler();
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
