import { FormatTime } from "~/components/common";
import { Image } from "antd";
import { m } from "~/paraglide/messages";
import { StorageActionsCell } from "./storage-actions-cell";

export const createColumns = ({ refetch }: { refetch?: () => void }) => {
  return [
    {
      dataIndex: "path",
      title: m.tools_storage_column_preview(),
      ellipsis: true,
      width: 80,
      align: "center" as const,
      render(_: string, record: any) {
        if (record?.type?.startsWith("image") && !record.path?.startsWith("avatars/")) {
          return (
            <Image
              style={{
                width: 50,
                height: 50,
                objectFit: "cover",
                borderRadius: 4,
              }}
              src={record.path}
              preview={false}
            />
          );
        }
        return (
          <div
            style={{
              display: "flex",
              height: 50,
              width: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
              backgroundColor: "#f3f4f6",
              fontSize: 18,
            }}
          >
            📄
          </div>
        );
      },
    },
    {
      dataIndex: "name",
      title: m.tools_storage_column_name(),
      ellipsis: true,
    },
    {
      dataIndex: "extName",
      title: m.tools_storage_column_ext(),
      ellipsis: true,
      width: 80,
    },
    {
      dataIndex: "type",
      title: m.tools_storage_column_type(),
      ellipsis: true,
      width: 120,
    },
    {
      dataIndex: "size",
      title: m.tools_storage_column_size(),
      ellipsis: true,
      width: 80,
      render(_: string, record: any) {
        const size = Number(record.size) || 0;
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
        return `${(size / 1024 / 1024).toFixed(1)} MB`;
      },
    },
    {
      dataIndex: "createdAt",
      title: m.tools_storage_column_uploaded_at(),
      ellipsis: true,
      width: 160,
      render: (_: string, record: any) => {
        return <FormatTime timeStr={record.createdAt} />;
      },
    },
    {
      dataIndex: "op",
      title: m.tools_storage_column_action(),
      width: 60,
      render: (_: string, record: any) => <StorageActionsCell record={record} refetch={refetch} />,
    },
  ];
};
