import { Button, Popconfirm, Space, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { UpdateUserModal } from "./update-user-modal";
import { useDeleteUser } from "~/api-client/queries/system/system-user";
import { m } from "~/paraglide/messages";

function DeleteAction({ record, reload }: any) {
  const deleteUserMutation = useDeleteUser();
  return (
    <Popconfirm
      title={m.system_user_confirm_delete_item()}
      onConfirm={async () => {
        const ids = [record.id];
        const result: any = await deleteUserMutation.mutateAsync({ ids });
        if (result?.code !== 0) {
          message.error(result?.message);
          return false;
        }
        message.success(result?.message);
        reload?.();
        return true;
      }}
    >
      <Button danger type="link" icon={<DeleteOutlined />} />
    </Popconfirm>
  );
}

export const ColumnsOp = (props: any) => {
  const { depts, roles, record, reload } = props;
  return (
    <Space>
      <UpdateUserModal depts={depts} roles={roles ?? []} record={record} reload={reload} />
      <DeleteAction record={record} reload={reload} />
    </Space>
  );
};
