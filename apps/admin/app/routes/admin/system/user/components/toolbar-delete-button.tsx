import { Button, Popconfirm, message } from "antd";
import { useDeleteUser } from "~/api-client/queries/system/system-user";
import { m } from "~/paraglide/messages";

type ToolbarDeleteButtonProps = {
  selectedRow: any[];
  reload: (...args: any) => any;
  setSelectedRow: any;
};

export function ToolbarDeleteButton(props: ToolbarDeleteButtonProps) {
  const { selectedRow, reload, setSelectedRow } = props;
  const deleteUserMutation = useDeleteUser();

  if (selectedRow.length === 0) return null;

  return (
    <Popconfirm
      title={m.system_user_confirm_batch_delete()}
      onConfirm={async () => {
        const ids = selectedRow.map((id: any) => id);
        const result: any = await deleteUserMutation.mutateAsync({ ids });
        if (result?.code !== 0) {
          message.error(result?.message);
          return false;
        }
        message.success(result?.message);
        reload?.();
        setSelectedRow([]);
        return true;
      }}
    >
      <Button danger>{m.system_delete()}</Button>
    </Popconfirm>
  );
}
