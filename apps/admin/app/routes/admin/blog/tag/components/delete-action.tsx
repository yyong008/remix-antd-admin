import { m } from "~/paraglide/messages";
import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteBlogTag } from "~/api-client/queries/blog/blog-tag";

type DeleteActionProps = {
  record: { id: string };
  refetch?: () => void;
};

export function DeleteAction({ record, refetch }: DeleteActionProps) {
  const { mutateAsync, isPending } = useDeleteBlogTag();

  return (
    <Popconfirm
      title={m.blog_action_confirm_delete_tag()}
      onConfirm={async () => {
        try {
          await mutateAsync({ ids: [Number(record.id)] });
          message.success(m.blog_tag_toast_deleted());
          refetch?.();
        } catch (e) {
          message.error(e instanceof Error ? e.message : m.blog_tag_toast_failed());
        }
      }}
    >
      <Button type="link" danger icon={<DeleteOutlined />} loading={isPending} />
    </Popconfirm>
  );
}
