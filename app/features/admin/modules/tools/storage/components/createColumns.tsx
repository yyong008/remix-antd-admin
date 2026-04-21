import { FormatTime } from "~/components/common";
import { Image } from "antd";
import { StorageActionsCell } from "./StorageActionsCell";

export const createColumns = ({ refetch }: { refetch?: () => void }) => {
  return [
    {
      dataIndex: "path",
      title: "预览",
      ellipsis: true,
      width: 80,
      align: "center" as const,
      render(_: string, record: any) {
        if (record?.type?.startsWith("image")) {
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
      title: "文件名",
      ellipsis: true,
    },
    {
      dataIndex: "extName",
      title: "后缀",
      ellipsis: true,
      width: 80,
    },
    {
      dataIndex: "type",
      title: "类型",
      ellipsis: true,
      width: 120,
    },
    {
      dataIndex: "size",
      title: "大小",
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
      title: "上传时间",
      ellipsis: true,
      width: 160,
      render: (_: string, record: any) => {
        return <FormatTime timeStr={record.createdAt} />;
      },
    },
    {
      dataIndex: "op",
      title: "操作",
      width: 60,
      render: (_: string, record: any) => <StorageActionsCell record={record} refetch={refetch} />,
    },
  ];
};
