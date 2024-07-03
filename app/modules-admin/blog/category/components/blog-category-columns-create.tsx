import * as ic from "@ant-design/icons";

import { BlogCategoryDeleteIt } from "./blog-category-delete-it";
import BlogCategoryModalUpdate from "./blog-category-modal-update";
import { Link } from "@remix-run/react";
import { Space } from "antd";

const { SwitcherOutlined } = ic;

export const blogCategoryColumnsCreate = (lang: string, refetch: any) => [
  {
    dataIndex: "name",
    title: "分类名字",
    renderText(_: any, record: any) {
      return (
        <Link to={`/${lang}/admin/blog?category=${record.id}`}>
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
    title: "标签内容",
  },
  {
    dataIndex: "op",
    title: "操作",
    render(_: any, record: any) {
      return (
        <Space>
          <BlogCategoryModalUpdate record={record} refetch={refetch} />
          <BlogCategoryDeleteIt record={record} refetch={refetch} />
        </Space>
      );
    },
  },
];
