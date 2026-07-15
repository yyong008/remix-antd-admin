import type { MenuProps } from "antd";

import { Dropdown, Tag } from "antd";
import { m } from "~/paraglide/messages";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export function createColumns({
  onUpdate,
  onDelete,
}: {
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
                {m.profile_link_action_edit()}
              </span>
            ),
            onClick: (e) => {
              e.domEvent.stopPropagation();
              onUpdate(record);
            },
          },
          {
            key: "delete",
            label: (
              <span style={{ color: "#ff4d4f" }}>
                <DeleteOutlined style={{ marginRight: 8 }} />
                {m.profile_link_action_delete()}
              </span>
            ),
            onClick: (e) => {
              e.domEvent.stopPropagation();
              onDelete(record);
            },
          },
        ];
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: 8,
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
                minWidth: 0,
              }}
            >
              {record.name}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Tag color="processing" style={{ margin: 0 }}>
                {typeof record.linkCount === "number" ? record.linkCount : 0}
              </Tag>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <span
                  style={{ cursor: "pointer", fontSize: 16, padding: "0 4px" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  ⋮
                </span>
              </Dropdown>
            </div>
          </div>
        );
      },
    },
  ];
}
