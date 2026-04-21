import {
  DeleteOutlined,
  EyeOutlined,
  FileOutlined,
  LinkOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Modal, type MenuProps } from "antd";
import { useDeleteToolsStorage } from "~/api-client/queries/tools-storage";

export function StorageActionsCell({ record, refetch }: { record: any; refetch?: () => void }) {
  const { mutateAsync: deleteStorage, isPending: isDeleting } = useDeleteToolsStorage();

  const handleDelete = () => {
    Modal.confirm({
      title: "确定要删除该文件吗？",
      okText: "确认",
      cancelText: "取消",
      async onOk() {
        try {
          await deleteStorage({ ids: [record.id] });
          refetch?.();
          Modal.success({ title: "删除成功" });
        } catch (e) {
          Modal.error({ title: e instanceof Error ? e.message : "删除失败" });
        }
      },
    });
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(record.path);
    Modal.success({ title: "链接已复制" });
  };

  const items: MenuProps["items"] = [
    {
      key: "view",
      icon: record.type?.startsWith("image") ? <EyeOutlined /> : <FileOutlined />,
      label: "查看",
      onClick: () => {
        if (record.type?.startsWith("image")) {
          Modal.info({
            title: record.name,
            content: (
              <img
                src={record.path}
                alt={record.name}
                style={{ maxWidth: "100%", maxHeight: "60vh", objectFit: "contain" }}
              />
            ),
            width: 800,
            okText: "关闭",
          });
        } else {
          window.open(record.path, "_blank");
        }
      },
    },
    {
      key: "copy",
      icon: <LinkOutlined />,
      label: "复制链接",
      onClick: handleCopyUrl,
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: "删除",
      danger: true,
      disabled: isDeleting,
      onClick: handleDelete,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button type="text" size="small" icon={<MoreOutlined />} />
    </Dropdown>
  );
}
