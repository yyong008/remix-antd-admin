import { Space, Tag } from "antd";
import { href, Link } from "react-router";

import { DeleteAction } from "./DeleteAction";
import { UpdateNewsCategoryModal } from "./UpdateNewsCategoryModal";
import { isNewsCategoryVisible } from "../../news-category-select";
import { m } from "~/paraglide/messages";

export function createColumns({ refetch, locale }: { refetch: () => void; locale?: string }) {
  return [
    {
      dataIndex: "name",
      title: m.news_category_field_name(),
      render(_: unknown, record: { id: string; name: string }) {
        return (
          <Link
            to={{
              pathname: href("/:locale?/admin/news/list", { locale }),
              search: `?category=${encodeURIComponent(record.id)}`,
            }}
          >
            <Tag color="blue">{record.name}</Tag>
          </Link>
        );
      },
    },
    {
      dataIndex: "description",
      title: m.news_category_field_description(),
    },
    {
      dataIndex: "visible",
      title: m.news_category_field_visible(),
      render(_: unknown, record: { visible?: unknown }) {
        return isNewsCategoryVisible(record.visible) ? (
          <Tag color="green">{m.news_list_visible()}</Tag>
        ) : (
          <Tag>{m.news_list_hidden()}</Tag>
        );
      },
    },
    {
      dataIndex: "op",
      title: m.news_list_column_action(),
      render(
        _: unknown,
        record: { id: string; name?: string; description?: string | null; visible?: unknown },
      ) {
        return (
          <Space>
            <UpdateNewsCategoryModal record={record} refetch={refetch} />
            <DeleteAction record={record} refetch={refetch} title={m.news_action_delete()} />
          </Space>
        );
      },
    },
  ];
}
