import { Button, Dropdown, Modal, type MenuProps } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  MoreOutlined,
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import { useDeleteBlog, useUpdateBlog } from "~/api-client/queries/blog/blog";
import { FormatTime } from "~/components/common";

function BlogActionsCell({
  record,
  refetch,
  locale,
}: {
  record: any;
  refetch?: () => void;
  locale?: string;
}) {
  const { mutateAsync: deleteBlog, isPending: isDeleting } = useDeleteBlog();
  const { mutateAsync: updateBlog, isPending: isUpdating } = useUpdateBlog();

  const handleTogglePublish = () => {
    Modal.confirm({
      title: record.isPublished ? "确定要下架该文章吗？" : "确定要发布该文章吗？",
      okText: "确认",
      cancelText: "取消",
      async onOk() {
        try {
          const result = (await updateBlog({
            id: record.id,
            isPublished: !record.isPublished,
          })) as {
            code?: number;
            message?: string;
          };
          if (result.code !== 0) {
            Modal.error({ title: result.message ?? "操作失败" });
            return;
          }
          refetch?.();
          Modal.success({ title: record.isPublished ? "下架成功" : "发布成功" });
        } catch (e) {
          Modal.error({ title: e instanceof Error ? e.message : "操作失败" });
        }
      },
    });
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "确定要删除吗？",
      okText: "确认",
      cancelText: "取消",
      async onOk() {
        const result = (await deleteBlog({ ids: [record.id] })) as {
          code?: number;
          message?: string;
        };
        if (result.code !== 0) {
          Modal.error({ title: result.message ?? "删除失败" });
          return;
        }
        refetch?.();
        Modal.success({ title: "删除成功" });
      },
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "view",
      icon: <EyeOutlined />,
      label: "查看内容",
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
          okText: "关闭",
        });
      },
    },
    {
      key: "edit",
      icon: <EditOutlined />,
      label: "编辑",
      onClick: () => {
        window.location.href = `/${locale || ""}/admin/blog/edit/${record.id}`.replace(/\/+/g, "/");
      },
    },
    {
      key: "togglePublish",
      icon: record.isPublished ? <ExportOutlined /> : <ImportOutlined />,
      label: record.isPublished ? "下架" : "发布",
      disabled: isUpdating,
      onClick: handleTogglePublish,
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

export const createColumns = ({
  locale,
  refetch,
  categoryById,
  tagById,
}: {
  locale?: string;
  refetch?: () => void;
  categoryById?: Map<string, string>;
  tagById?: Map<string, string>;
}) => [
  {
    dataIndex: "title",
    title: "文章标题",
    ellipsis: true,
    width: 360,
    render: (_: unknown, record: any) => (
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
            okText: "关闭",
          });
        }}
      >
        {record.title}
      </a>
    ),
  },
  {
    dataIndex: "author",
    title: "作者",
    ellipsis: true,
    width: 100,
  },
  {
    dataIndex: "isPublished",
    title: "状态",
    width: 80,
    render: (_: unknown, record: { isPublished?: boolean }) => {
      return record.isPublished ? (
        <span style={{ color: "#52c41a" }}>已发布</span>
      ) : (
        <span style={{ color: "#faad14" }}>草稿</span>
      );
    },
  },
  {
    dataIndex: "categoryId",
    title: "分类",
    ellipsis: true,
    width: 100,
    render: (_: unknown, record: { categoryId?: string | null }) => {
      const id = record.categoryId;
      if (!id) return "—";
      return categoryById?.get(id) ?? id;
    },
  },
  {
    dataIndex: "tagId",
    title: "标签",
    ellipsis: true,
    width: 100,
    render: (_: unknown, record: { tagId?: string | null }) => {
      const id = record.tagId;
      if (!id) return "—";
      return tagById?.get(id) ?? id;
    },
  },
  {
    dataIndex: "viewCount",
    title: "浏览",
    width: 80,
  },
  {
    dataIndex: "publishedAt",
    title: "发布时间",
    width: 130,
    render: (_: unknown, record: any) => {
      return <FormatTime timeStr={record.publishedAt} format="YYYY-MM-DD" />;
    },
  },
  {
    dataIndex: "op",
    title: "操作",
    width: 60,
    render: (_: unknown, record: any) => (
      <BlogActionsCell record={record} refetch={refetch} locale={locale} />
    ),
  },
];
