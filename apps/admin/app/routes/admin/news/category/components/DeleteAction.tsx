import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useDeleteNewsCategory } from "~/api-client/queries/news/news-category";

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
      title={title || "确定要删除吗?"}
      onConfirm={async () => {
        try {
          await mutateAsync({ ids: [record.id] });
          refetch?.();
          message.success("删除成功");
        } catch (e) {
          message.error(e instanceof Error ? e.message : "删除失败");
        }
      }}
    >
      <Button type="link" danger icon={<DeleteOutlined />} loading={isPending} />
    </Popconfirm>
  );
}
