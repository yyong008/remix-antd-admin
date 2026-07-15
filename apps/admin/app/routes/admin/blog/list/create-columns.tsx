import { Button, Dropdown, message, Modal, type MenuProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ExportOutlined,
  ImportOutlined,
  MoreOutlined,
} from "@ant-design/icons";

import { useDeleteBlog, useUpdateBlog } from "~/api-client/queries/blog/blog";
import { m } from "~/paraglide/messages";

function BlogActionsCell({
  record,
  refetch,
}: {
  record: {
    id: string;
    title: string;
    content?: string;
    isPublished?: boolean;
  };
  refetch?: () => void;
}) {
  const { mutateAsync: deleteBlog, isPending: isDeleting } = useDeleteBlog();
  const { mutateAsync: updateBlog, isPending: isUpdating } = useUpdateBlog();

  const handleTogglePublish = () => {
    Modal.confirm({
      title: record.isPublished
        ? m.blog_action_confirm_unpublish()
        : m.blog_action_confirm_publish(),
      okText: m.blog_category_submit_button(),
      cancelText: m.blog_edit_cancel_button(),
      async onOk() {
        try {
          await updateBlog({ id: record.id, isPublished: !record.isPublished });
          message.success(
            record.isPublished ? m.blog_toast_unpublished() : m.blog_toast_published(),
          );
          refetch?.();
        } catch (e) {
          message.error(e instanceof Error ? e.message : m.blog_toast_publish_failed());
        }
      },
    });
  };

  const handleDelete = async () => {
    try {
      await deleteBlog({ ids: [record.id] });
      message.success(m.blog_toast_deleted());
      refetch?.();
    } catch (e) {
      message.error(e instanceof Error ? e.message : m.blog_toast_delete_failed());
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "view",
      icon: <EyeOutlined />,
      label: m.blog_action_view(),
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
          okText: m.blog_action_close(),
        });
      },
    },
    {
      key: "edit",
      icon: <EditOutlined />,
      label: m.blog_action_edit(),
      onClick: () => {
        window.location.href =
          `/${window.location.pathname.split("/")[1] || ""}/admin/blog/edit/${record.id}`.replace(
            /\/+/g,
            "/",
          );
      },
    },
    {
      key: "togglePublish",
      icon: record.isPublished ? <ExportOutlined /> : <ImportOutlined />,
      label: record.isPublished ? m.blog_action_unpublish() : m.blog_action_publish(),
      disabled: isUpdating,
      onClick: handleTogglePublish,
    },
    { type: "divider" },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: m.blog_action_delete(),
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
  categoryById,
  tagById,
}: {
  refetch?: () => void;
  categoryById?: Map<string, string>;
  tagById?: Map<string, string>;
}) {
  return [
    {
      dataIndex: "title",
      title: m.blog_list_column_title(),
      ellipsis: true,
      width: 360,
      render: (
        _: unknown,
        record: { id: string; title: string; content?: string; isPublished?: boolean },
      ) => (
        <a
          style={{
            display: "block",
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={record.title}
          onClick={(e) => {
            e.preventDefault();
            Modal.info({
              title: record.title,
              content: (
                <div
                  style={{ maxHeight: "60vh", overflow: "auto" }}
                  dangerouslySetInnerHTML={{ __html: record.content || "" }}
                />
              ),
              width: 700,
              okText: m.blog_action_close(),
            });
          }}
        >
          {record.title}
        </a>
      ),
    },
    {
      dataIndex: "author",
      title: m.blog_list_column_author(),
      ellipsis: true,
      width: 100,
    },
    {
      dataIndex: "isPublished",
      title: m.blog_list_column_status(),
      width: 80,
      render: (_: unknown, record: { isPublished?: boolean }) =>
        record.isPublished ? (
          <span style={{ color: "#52c41a" }}>{m.blog_list_status_published()}</span>
        ) : (
          <span style={{ color: "#faad14" }}>{m.blog_list_status_draft()}</span>
        ),
    },
    {
      dataIndex: "categoryId",
      title: m.blog_list_column_category(),
      ellipsis: true,
      width: 100,
      render: (_: unknown, record: { categoryId?: string | null }) => {
        const id = record.categoryId;
        if (!id) return "—";
        return categoryById?.get(String(id)) ?? id;
      },
    },
    {
      dataIndex: "tagId",
      title: m.blog_list_column_tag(),
      ellipsis: true,
      width: 100,
      render: (_: unknown, record: { tagId?: string | null }) => {
        const id = record.tagId;
        if (!id) return "—";
        return tagById?.get(String(id)) ?? id;
      },
    },
    {
      dataIndex: "viewCount",
      title: m.blog_list_column_views(),
      width: 80,
    },
    {
      dataIndex: "publishedAt",
      title: m.blog_list_column_published_at(),
      width: 130,
    },
    {
      dataIndex: "op",
      title: m.blog_list_column_action(),
      width: 60,
      render: (
        _: unknown,
        record: { id: string; title: string; content?: string; isPublished?: boolean },
      ) => <BlogActionsCell record={record} refetch={refetch} />,
    },
  ];
}
