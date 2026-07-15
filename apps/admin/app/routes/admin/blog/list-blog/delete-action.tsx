import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useDeleteBlog } from "~/api-client/queries/blog/blog";
import { m } from "~/paraglide/messages";

type DeleteActionProps = {
  record: { id: string };
  refetch: () => void;
};

export function DeleteAction({ record, refetch }: DeleteActionProps) {
  const { mutateAsync, isPending } = useDeleteBlog();

  return (
    <Popconfirm
      title={m.blog_action_confirm_delete()}
      onConfirm={async () => {
        try {
          await mutateAsync({ ids: [record.id] });
          message.success(m.blog_toast_deleted());
          refetch?.();
        } catch (e) {
          message.error(e instanceof Error ? e.message : m.blog_toast_delete_failed());
        }
      }}
    >
      <Button type="link" danger icon={<DeleteOutlined />} loading={isPending} />
    </Popconfirm>
  );
}
