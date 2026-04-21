import { Dropdown, message, Tag } from "antd";
import type { MenuProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export function createColumns({
  refetch,
  onUpdate,
  onDelete,
}: {
  refetch: () => void;
  onUpdate: (record: { id: string; name: string; description?: string }) => void;
  onDelete: (record: { id: string }) => void;
}) {
  return [
    {
      dataIndex: "name",
      title: "",
      render(_: unknown, record: { id: string; name: string; linkCount?: number }) {
        const items: MenuProps["items"] = [
          {
            key: "update",
            label: (
              <span>
                <EditOutlined style={{ marginRight: 8 }} />
                编辑
              </span>
            ),
            onClick: () => onUpdate(record),
          },
          {
            key: "delete",
            label: (
              <span style={{ color: "#ff4d4f" }}>
                <DeleteOutlined style={{ marginRight: 8 }} />
                删除
              </span>
            ),
            onClick: () => onDelete(record),
          },
        ];
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: 8,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span style={{ fontWeight: 500 }}>{record.name}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Tag color="processing" style={{ margin: 0 }}>
                {typeof record.linkCount === "number" ? record.linkCount : 0}
              </Tag>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <span style={{ cursor: "pointer", fontSize: 16, padding: "0 4px" }}>⋮</span>
              </Dropdown>
            </div>
          </div>
        );
      },
    },
  ];
}
