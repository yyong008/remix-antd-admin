import {
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined,
  FileOutlined,
  LinkOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, message, Modal, type MenuProps } from "antd";
import { m } from "~/paraglide/messages";
import { useDeleteToolsStorage } from "~/api-client/queries/tools/tools-storage";

export function StorageActionsCell({ record, refetch }: { record: any; refetch?: () => void }) {
  const { mutateAsync: deleteStorage, isPending: isDeleting } = useDeleteToolsStorage();

  const handleDelete = () => {
    Modal.confirm({
      title: m.tools_storage_confirm_delete(),
      okText: m.tools_storage_action_delete(),
      cancelText: m.tools_storage_upload_clear(),
      async onOk() {
        try {
          await deleteStorage({ ids: [record.id] });
          refetch?.();
          message.success(m.tools_storage_toast_deleted());
        } catch (e) {
          message.error(e instanceof Error ? e.message : m.tools_storage_toast_delete_failed());
        }
      },
    });
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(record.path);
    Modal.success({ title: m.tools_storage_copy_link_success() });
  };

  const handleDownload = () => {
    const token = localStorage.getItem("token");
    const url = new URL(record.path, window.location.origin);
    if (token) {
      url.searchParams.set("token", token);
    }
    const a = document.createElement("a");
    a.href = url.toString();
    a.download = record.name;
    a.click();
  };

  const items: MenuProps["items"] = [
    {
      key: "download",
      icon: <DownloadOutlined />,
      label: m.tools_storage_action_download(),
      onClick: handleDownload,
    },
    {
      key: "view",
      icon: record.type?.startsWith("image") ? <EyeOutlined /> : <FileOutlined />,
      label: m.tools_storage_action_view(),
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
      label: m.tools_storage_action_copy_link(),
      onClick: handleCopyUrl,
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: m.tools_storage_action_delete(),
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
