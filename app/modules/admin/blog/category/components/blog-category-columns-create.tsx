import * as ic from "@ant-design/icons";

import { BlogCategoryDeleteIt } from "./blog-category-delete-it";
import { type Fetcher, Link } from "@remix-run/react";
import { Space } from "antd";
import { goBlogNav } from "~/hooks";
import BlogCategoryModalUpdate from "./blog-category-modal-update";

const { SwitcherOutlined } = ic;

export const blogCategoryColumnsCreate = (lang: string, fetcher: Fetcher) => [
  {
    dataIndex: "name",
    title: "分类名字",
    renderText(_: any, record: any) {
      return (
        <Link to={goBlogNav(lang!, { category: record.id })}>
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
          <BlogCategoryModalUpdate fetcher={fetcher} record={record} />
          <BlogCategoryDeleteIt fetcher={fetcher} record={record} />
        </Space>
      );
    },
  },
];
