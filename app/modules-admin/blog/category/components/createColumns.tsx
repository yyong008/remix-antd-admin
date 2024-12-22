import { DeleteAction } from "./DeleteAction";
import { Link } from "@remix-run/react";
import { Space } from "antd";
import { SwitcherOutlined } from "@ant-design/icons";
import { UpdateBlogCategoryModal } from "./UpdateBlogCategoryModal";
import { useColorPrimary } from "~/hooks/useColorPrimary";

export function createColumns({ lang, refetch }: any) {
  return [
    {
      dataIndex: "name",
      title: "分类名字",
      renderText(_: any, record: any) {
        return (
          <Link to={`/${lang}/admin/blog?category=${record.id}`}>
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
      title: "标签内容",
    },
    {
      dataIndex: "op",
      title: "操作",
      render(_: any, record: any) {
        return (
          <Space>
            <UpdateBlogCategoryModal record={record} refetch={refetch} />
            <DeleteAction record={record} refetch={refetch} title={""} />
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
