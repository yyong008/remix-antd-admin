import { ColumnsPopConfirmDelete } from "./columns-popconfirm-delete";
import { Space } from "antd";
import { UpdateUserModal } from "../../update-user-modal";

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
      <ColumnsPopConfirmDelete record={record} reload={reload} />
    </Space>
  );
};
