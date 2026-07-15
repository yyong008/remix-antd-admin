import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useDeleteNewsCategory } from "~/api-client/queries/news/news-category";
import { m } from "~/paraglide/messages";

type DeleteActionProps = {
  record: { id: string };
  title?: string;
  refetch: () => void;
};

export function DeleteAction(props: DeleteActionProps) {
  const { record, title, refetch } = props;
  const { mutateAsync, isPending } = useDeleteNewsCategory();

  return (
    <Popconfirm
      title={title || m.news_action_confirm_delete_category()}
      onConfirm={async () => {
        try {
          await mutateAsync({ ids: [record.id] });
          refetch?.();
          message.success(m.news_category_toast_deleted());
        } catch (e) {
          message.error(e instanceof Error ? e.message : m.news_category_toast_failed());
        }
      }}
    >
      <Button type="link" danger icon={<DeleteOutlined />} loading={isPending} />
    </Popconfirm>
  );
}
