import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useDeleteProfileLinkCategory } from "~/api-client/queries/profile/profile-link-category";
import { m } from "~/paraglide/messages";

type DeleteActionProps = {
  record: { id: string };
  title?: string;
  refetch: () => void;
};

export function DeleteAction({ record, title, refetch }: DeleteActionProps) {
  const del = useDeleteProfileLinkCategory();

  return (
    <Popconfirm
      title={title || m.profile_link_action_confirm_delete_category()}
      onConfirm={async () => {
        try {
          await del.mutateAsync({ ids: [record.id] });
          message.success(m.profile_link_toast_deleted());
          refetch();
        } catch (e) {
          message.error(e instanceof Error ? e.message : m.profile_link_toast_delete_failed());
        }
      }}
    >
      <Button type="link" danger size="small" icon={<DeleteOutlined />} loading={del.isPending} />
    </Popconfirm>
  );
}
