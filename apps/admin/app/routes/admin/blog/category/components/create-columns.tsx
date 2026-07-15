import { Space } from "antd";
import { href, Link, useParams } from "react-router";

import { m } from "~/paraglide/messages";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { SwitcherOutlined } from "@ant-design/icons";

import { DeleteAction } from "./delete-action";
import { UpdateBlogCategoryModal } from "./update-blog-category-modal";

export function createColumns({ refetch }: { refetch?: () => void }) {
  const { locale } = useParams();
  return [
    {
      dataIndex: "name",
      title: m.blog_category_field_name(),
      renderText(_: unknown, record: { id: string; name: string }) {
        const linkPath = String(href("/:locale?/admin/blog" as any, { locale }));
        return (
          <Link to={`${linkPath}?category=${record.id}` as any}>
            <Space>
              <CategoryIcons />
              <span>{record.name}</span>
            </Space>
          </Link>
        );
      },
    },
    {
      dataIndex: "description",
      title: m.blog_category_field_description(),
    },
    {
      dataIndex: "op",
      title: m.blog_list_column_action(),
      render(
        _: unknown,
        record: { id: string; name?: string; description?: string | null; showOnClient?: boolean },
      ) {
        return (
          <Space>
            <UpdateBlogCategoryModal record={record} refetch={refetch} />
            <DeleteAction record={record} refetch={refetch} />
          </Space>
        );
      },
    },
  ];
}

function CategoryIcons() {
  const { colorPrimary } = useColorPrimary();
  return <SwitcherOutlined style={{ color: colorPrimary }} />;
}
