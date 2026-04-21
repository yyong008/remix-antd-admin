import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useDeleteNews } from "~/api-client/queries/news";

type DeleteActionProps = {
  record: { id: string };
  title?: string;
  refetch: () => void;
  inline?: boolean;
};

export function DeleteAction(props: DeleteActionProps) {
  const { record, title, refetch, inline } = props;
  const { mutateAsync, isPending } = useDeleteNews();

  const trigger = <Button type="link" danger icon={<DeleteOutlined />} loading={isPending} />;

  return (
    <Popconfirm
      title={title || "确定要删除吗?"}
      onConfirm={async () => {
        const result = (await mutateAsync({ ids: [record.id] })) as {
          code?: number;
          message?: string;
        };
        if (result.code !== 0) {
          message.error(result.message ?? "删除失败");
          return;
        }
        refetch?.();
        message.success("删除成功");
      }}
    >
      {inline ? <span style={{ color: "#ef4444", cursor: "pointer" }}>删除</span> : trigger}
    </Popconfirm>
  );
}
