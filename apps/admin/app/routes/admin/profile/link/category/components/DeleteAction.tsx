import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useDeleteProfileLinkCategory } from "~/api-client/queries/profile/profile-link-category";

type DeleteActionProps = {
  record: { id: string };
  title: string;
  refetch: () => void;
};

export function DeleteAction(props: DeleteActionProps) {
  const { record, title, refetch } = props;
  const del = useDeleteProfileLinkCategory();

  return (
    <Popconfirm
      title={title || "确定要删除吗?"}
      onConfirm={async () => {
        const res = (await del.mutateAsync({ ids: [record.id] })) as {
          code?: number;
          message?: string;
        };
        if (res.code !== 0) {
          message.error(res.message ?? "删除失败");
          return;
        }
        message.success("删除成功");
        refetch();
      }}
    >
      <Button type="link" danger size="small" icon={<DeleteOutlined />} loading={del.isPending} />
    </Popconfirm>
  );
}
