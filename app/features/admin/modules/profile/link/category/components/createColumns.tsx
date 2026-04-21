import { Space, Tag } from "antd";

import { DeleteAction } from "./DeleteAction";
import { UpdateLinkCategoryModal } from "./UpdateLinkCategoryModal";

export function createColumns({ refetch }: { refetch: () => void }) {
  return [
    {
      dataIndex: "name",
      title: "分类名",
      render(_: unknown, record: { id: string; name: string }) {
        return <span style={{ fontWeight: 500 }}>{record?.name}</span>;
      },
    },
    {
      dataIndex: "description",
      title: "描述",
      ellipsis: true,
    },
    {
      dataIndex: "linkCount",
      title: "链接数",
      width: 80,
      align: "right" as const,
      render(n: number) {
        return <Tag color="processing">{typeof n === "number" ? n : 0}</Tag>;
      },
    },
    {
      dataIndex: "op",
      title: "操作",
      render(_: unknown, record: { id: string }) {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <Space>
              <UpdateLinkCategoryModal record={record} refetch={refetch} />
              <DeleteAction record={record} refetch={refetch} title="删除分类" />
            </Space>
          </div>
        );
      },
    },
  ];
}
