import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useDeleteNews } from "~/api-client/queries/news/news";
import { m } from "~/paraglide/messages";

type DeleteActionProps = {
  record: { id: string };
  refetch: () => void;
  inline?: boolean;
};

export function DeleteAction({ record, refetch, inline }: DeleteActionProps) {
  const { mutateAsync, isPending } = useDeleteNews();

  const trigger = <Button type="link" danger icon={<DeleteOutlined />} loading={isPending} />;

  return (
    <Popconfirm
      title={m.news_action_confirm_delete()}
      onConfirm={async () => {
        try {
          await mutateAsync({ ids: [record.id] });
          message.success(m.news_toast_deleted());
          refetch?.();
        } catch (e) {
          message.error(e instanceof Error ? e.message : m.news_toast_delete_failed());
        }
      }}
    >
      {inline ? (
        <span style={{ color: "#ef4444", cursor: "pointer" }}>{m.news_action_delete()}</span>
      ) : (
        trigger
      )}
    </Popconfirm>
  );
}
