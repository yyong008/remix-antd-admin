import { Button, Dropdown, Modal, Popconfirm, Typography, type MenuProps } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { useState } from "react";

import { FormatTime } from "@/components/common";

import { LinkUrlDisplay } from "./LinkUrlDisplay";
import { UpdateLinkModal } from "./UpdateLinkModal";

import { useDeleteProfileLink } from "~/api-client/queries/profile-link";

function LinkActionsCell({
  record,
  refetch,
  categoryId,
}: {
  record: { id: string; name?: string; url?: string; description?: string | null };
  refetch: () => void;
  categoryId: string;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const del = useDeleteProfileLink();

  const handleDelete = () => {
    Modal.confirm({
      title: "确定删除该链接？",
      okText: "确认",
      cancelText: "取消",
      async onOk() {
        try {
          await del.mutateAsync({ ids: [record.id] });
          Modal.success({ title: "已删除" });
          refetch();
        } catch (e) {
          Modal.error({ title: e instanceof Error ? e.message : "删除失败" });
        }
      },
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "edit",
      icon: <EditOutlined />,
      label: "编辑",
      onClick: () => setEditOpen(true),
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: "删除",
      danger: true,
      disabled: del.isPending,
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button type="text" size="small" icon={<MoreOutlined />} />
      </Dropdown>
      <UpdateLinkModal
        refetch={refetch}
        record={record}
        categoryId={categoryId}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
}

export function createColumns({
  refetch,
  categoryId,
}: {
  refetch: () => void;
  categoryId: string;
}) {
  return [
    {
      dataIndex: "name",
      title: "链接名",
      render(_: unknown, record: { name: string }) {
        return (
          <Typography.Text strong style={{ fontSize: 14 }}>
            {record.name}
          </Typography.Text>
        );
      },
    },
    {
      dataIndex: "url",
      title: "链接地址",
      ellipsis: true,
      render(_: unknown, record: { url: string }) {
        return <LinkUrlDisplay url={record.url} />;
      },
    },
    {
      dataIndex: "description",
      title: "描述",
      ellipsis: true,
      render(_: unknown, record: { description?: string | null }) {
        return (
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {record.description || "-"}
          </Typography.Text>
        );
      },
    },
    {
      dataIndex: "createdAt",
      title: "创建时间",
      width: 140,
      render(_: unknown, record: { createdAt?: Date | number | null }) {
        return <FormatTime timeStr={record.createdAt ?? undefined} />;
      },
    },
    {
      dataIndex: "op",
      title: "操作",
      width: 80,
      render(
        _: unknown,
        record: { id: string; name?: string; url?: string; description?: string | null },
      ) {
        return <LinkActionsCell record={record} refetch={refetch} categoryId={categoryId} />;
      },
    },
  ];
}
