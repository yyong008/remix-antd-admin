import * as icons from "@ant-design/icons";

import { Button, Popconfirm, message } from "antd";

import { useDeleteUserByIdsMutation } from "@/apis-client/admin/system/user";

const { DeleteOutlined } = icons;

export function ColumnsPopConfirmDelete({ record, reload }: any) {
  const [deleteUser] = useDeleteUserByIdsMutation();
  return (
    <Popconfirm
      key="del"
      title="Are your sure?"
      onConfirm={async () => {
        const ids = [record.id];
        const result = await deleteUser(ids);
        if (result.data?.code !== 0) {
          message.error(result.data?.message);
          return false;
        }
        message.success(result.data?.message);
        reload?.();
        return true;
      }}
    >
      <Button danger type="link" icon={<DeleteOutlined />}></Button>
    </Popconfirm>
  );
}
