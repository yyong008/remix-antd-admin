import { DeleteAction } from "./DeleteAction";
import { Space } from "antd";
import { UpdateUserModal } from "./UpdateUserModal";

export const ColumnsOp = (props: any) => {
  const { depts, roles, record, reload, isLoading } = props;
  return (
    <Space>
      <UpdateUserModal
        depts={depts}
        roles={roles ?? []}
        record={record}
        key="mod-user-modal"
        loading={isLoading}
        reload={reload}
      />
      <DeleteAction record={record} reload={reload} />
    </Space>
  );
};
