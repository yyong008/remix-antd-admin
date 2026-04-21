import { href, Link } from "react-router";
import { Button, Dropdown, Tag, Modal, type MenuProps } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  MoreOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { useToggleNewsStatus } from "~/api-client/queries/news";
import { useDeleteNews } from "~/api-client/queries/news";

function NewsActionsCell({
  record,
  refetch,
  locale,
}: {
  record: any;
  refetch: () => void;
  locale?: string;
}) {
  const { mutateAsync: toggleStatus, isPending: isToggling } = useToggleNewsStatus();
  const { mutateAsync: deleteNews, isPending: isDeleting } = useDeleteNews();

  const handleToggleStatus = async () => {
    const result = (await toggleStatus({ id: record.id })) as { code?: number; message?: string };
    if (result.code !== 0) {
      Modal.error({ title: result.message ?? "操作失败" });
      return;
    }
    refetch();
    Modal.success({ title: record.status === 1 ? "已下架" : "已发布" });
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "确定要删除吗？",
      okText: "确认",
      cancelText: "取消",
      async onOk() {
        const result = (await deleteNews({ ids: [record.id] })) as {
          code?: number;
          message?: string;
        };
        if (result.code !== 0) {
          Modal.error({ title: result.message ?? "删除失败" });
          return;
        }
        refetch();
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
      key: "toggle",
      icon: record.status === 1 ? <StopOutlined /> : <CheckCircleOutlined />,
      label: record.status === 1 ? "下架" : "发布",
      onClick: handleToggleStatus,
      disabled: isToggling,
    },
    {
      key: "edit",
      icon: <EditOutlined />,
      label: "编辑",
      onClick: () => {
        window.location.href = href("/:locale?/admin/news/edit/:id", { locale, id: record.id });
      },
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
      title: "新闻标题",
      ellipsis: true,
      render: (_: unknown, record: any) => (
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
            pathname: href("/:locale?/news/:id", { locale, id: record.id }),
          }}
        >
          {record.title}
        </Link>
      ),
    },
    {
      dataIndex: "status",
      title: "状态",
      width: 80,
      render: (_: unknown, record: any) =>
        record.status === 1 ? <Tag color="green">已发布</Tag> : <Tag color="default">未发布</Tag>,
    },
    {
      dataIndex: "author",
      title: "作者",
      ellipsis: true,
    },
    {
      dataIndex: "source",
      title: "新闻来源",
      ellipsis: true,
    },
    {
      dataIndex: "newsId",
      title: "新闻分类",
      ellipsis: true,
      render: (_: unknown, record: { newsId?: string | null }) => {
        const id = record.newsId;
        if (!id) return "—";
        return categoryById?.get(id) ?? id;
      },
    },
    {
      dataIndex: "viewCount",
      title: "查看次数",
      width: 96,
    },
    {
      dataIndex: "op",
      title: "操作",
      width: 60,
      render: (_: unknown, record: any) => (
        <NewsActionsCell record={record} refetch={refetch} locale={locale} />
      ),
    },
  ];
}
