import { useState } from "react";
import { m } from "~/paraglide/messages";
import { FormatTime } from "~/components/common";
import { LinkUrlDisplay } from "./link-url-display";
import { UpdateLinkModal } from "./update-link-modal";
import { Button, Dropdown, Modal, Typography, type MenuProps } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { useDeleteProfileLink } from "~/api-client/queries/profile/profile-link";

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
      title: m.profile_link_action_confirm_delete(),
      okText: m.profile_account_sessions_revoke_ok(),
      cancelText: m.blog_edit_cancel_button(),
      async onOk() {
        try {
          await del.mutateAsync({ ids: [record.id] });
          Modal.success({ title: m.profile_link_toast_deleted() });
          refetch();
        } catch (e) {
          Modal.error({
            title: e instanceof Error ? e.message : m.profile_link_toast_delete_failed(),
          });
        }
      },
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "edit",
      icon: <EditOutlined />,
      label: m.profile_link_action_edit(),
      onClick: () => setEditOpen(true),
    },
    { type: "divider" },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: m.profile_link_action_delete(),
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
      title: m.profile_link_column_name(),
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
      title: m.profile_link_column_url(),
      ellipsis: true,
      render(_: unknown, record: { url: string }) {
        return <LinkUrlDisplay url={record.url} />;
      },
    },
    {
      dataIndex: "description",
      title: m.profile_link_column_description(),
      ellipsis: true,
      render(_: unknown, record: { description?: string | null }) {
        return (
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {record.description || "—"}
          </Typography.Text>
        );
      },
    },
    {
      dataIndex: "createdAt",
      title: m.profile_link_column_created_at(),
      width: 140,
      render(_: unknown, record: { createdAt?: Date | number | null }) {
        return <FormatTime timeStr={record.createdAt ?? undefined} />;
      },
    },
    {
      dataIndex: "op",
      title: m.profile_link_column_action(),
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
