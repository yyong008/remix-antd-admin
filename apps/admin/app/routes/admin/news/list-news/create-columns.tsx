import { href, Link } from "react-router";
import { Button, Dropdown, message, Modal, Tag, type MenuProps } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  StopOutlined,
} from "@ant-design/icons";

import { useDeleteNews, useToggleNewsStatus } from "~/api-client/queries/news/news";
import { m } from "~/paraglide/messages";

function NewsActionsCell({
  record,
  refetch,
  locale,
}: {
  record: {
    id: string;
    title: string;
    content?: string;
    status?: number;
  };
  refetch: () => void;
  locale?: string;
}) {
  const { mutateAsync: toggleStatus, isPending: isToggling } = useToggleNewsStatus();
  const { mutateAsync: deleteNews, isPending: isDeleting } = useDeleteNews();

  const handleToggleStatus = async () => {
    try {
      await toggleStatus({ id: record.id });
      message.success(record.status === 1 ? m.news_toast_unpublished() : m.news_toast_published());
      refetch();
    } catch (e) {
      message.error(e instanceof Error ? e.message : m.news_toast_update_failed());
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNews({ ids: [record.id] });
      message.success(m.news_toast_deleted());
      refetch();
    } catch (e) {
      message.error(e instanceof Error ? e.message : m.news_toast_delete_failed());
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "view",
      icon: <EyeOutlined />,
      label: m.news_action_view(),
      onClick: () => {
        Modal.info({
          title: record.title,
          content: (
            <div
              style={{ maxHeight: "60vh", overflow: "auto" }}
              dangerouslySetInnerHTML={{ __html: record.content || "" }}
            />
          ),
          width: 700,
          okText: m.news_action_close(),
        });
      },
    },
    {
      key: "toggle",
      icon: record.status === 1 ? <StopOutlined /> : <CheckCircleOutlined />,
      label: record.status === 1 ? m.news_action_unpublish() : m.news_action_publish(),
      onClick: handleToggleStatus,
      disabled: isToggling,
    },
    {
      key: "edit",
      icon: <EditOutlined />,
      label: m.news_action_edit(),
      onClick: () => {
        window.location.href = href("/:locale?/admin/news/edit/:id", {
          locale,
          id: record.id,
        });
      },
    },
    { type: "divider" },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: m.news_action_delete(),
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

export function createColumns({
  refetch,
  locale,
  categoryById,
}: {
  refetch: () => void;
  locale?: string;
  categoryById?: Map<string, string>;
}) {
  return [
    {
      dataIndex: "title",
      title: m.news_list_column_title(),
      ellipsis: true,
      render: (_: unknown, record: { id: string; title: string }) => (
        <Link
          style={{
            display: "block",
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={record.title}
          to={{
            pathname: href("/:locale?/news/:id" as any, { locale, id: record.id }),
          }}
        >
          {record.title}
        </Link>
      ),
    },
    {
      dataIndex: "status",
      title: m.news_list_column_status(),
      width: 80,
      render: (_: unknown, record: { status?: number }) =>
        record.status === 1 ? (
          <Tag color="green">{m.news_list_status_published()}</Tag>
        ) : (
          <Tag color="default">{m.news_list_status_draft()}</Tag>
        ),
    },
    {
      dataIndex: "author",
      title: m.news_list_column_author(),
      ellipsis: true,
    },
    {
      dataIndex: "source",
      title: m.news_list_column_source(),
      ellipsis: true,
    },
    {
      dataIndex: "newsId",
      title: m.news_list_column_category(),
      ellipsis: true,
      render: (_: unknown, record: { newsId?: string | null }) => {
        const id = record.newsId;
        if (!id) return "—";
        return categoryById?.get(id) ?? id;
      },
    },
    {
      dataIndex: "viewCount",
      title: m.news_list_column_view_count(),
      width: 96,
    },
    {
      dataIndex: "op",
      title: m.news_list_column_action(),
      width: 60,
      render: (
        _: unknown,
        record: { id: string; title: string; content?: string; status?: number },
      ) => <NewsActionsCell record={record} refetch={refetch} locale={locale} />,
    },
  ];
}
