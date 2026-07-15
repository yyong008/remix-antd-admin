import { Space } from "antd";
import { href, Link, useParams } from "react-router";
import { TagOutlined } from "@ant-design/icons";

import { m } from "~/paraglide/messages";
import { useColorPrimary } from "~/hooks/useColorPrimary";

import { DeleteAction } from "./delete-action";
import { UpdateBlogTagModal } from "./update-blog-tag-modal";

export const createColumns = ({ refetch }: { refetch?: () => void }) => {
  const { locale } = useParams();
  return [
    {
      dataIndex: "name",
      title: m.blog_tag_field_name(),
      renderText(_: unknown, record: { id: string; name: string }) {
        return (
          <Link
            to={
              `${String(href("/:locale?/admin/blog" as any, { locale }))}?tag=${record.id}` as any
            }
          >
            <Space>
              <TagIcons />
              <span>{record.name}</span>
            </Space>
          </Link>
        );
      },
    },
    {
      dataIndex: "description",
      title: m.blog_tag_field_description(),
    },
    {
      dataIndex: "op",
      title: m.blog_list_column_action(),
      render(_: unknown, record: { id: string; name?: string; description?: string | null }) {
        return (
          <Space>
            <UpdateBlogTagModal record={record} refetch={refetch} />
            <DeleteAction record={record} refetch={refetch} />
          </Space>
        );
      },
    },
  ];
};

function TagIcons() {
  const { colorPrimary } = useColorPrimary();
  return <TagOutlined style={{ color: colorPrimary }} />;
}
