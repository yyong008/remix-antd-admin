import { DeleteAction } from "./DeleteAction";
import { Link } from "@remix-run/react";
import { Space } from "antd";
import { SwitcherOutlined } from "@ant-design/icons";
import { UpdateBlogModal } from "./UpdateBlogModal";

export const createColumns = ({ lang, refetch }: any) => [
  {
    dataIndex: "name",
    title: "标签名字",
    renderText(_: any, record: any) {
      return (
        <Link to={`/${lang}/admin/blog?tag=${record.id}`}>
          <Space>
            <SwitcherOutlined />
            <span>{record.name}</span>
          </Space>
        </Link>
      );
    },
  },
  {
    dataIndex: "description",
    title: "描述",
  },
  {
    dataIndex: "op",
    title: "操作",
    render(_: any, record: any) {
      return (
        <Space>
          <UpdateBlogModal record={record} refetch={refetch} />
          <DeleteAction refetch={refetch} record={record} title={""} />
        </Space>
      );
    },
  },
];