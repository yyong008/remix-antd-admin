import * as ic from "@ant-design/icons";

import { BlogTagDeleteIt } from "./blog-tag-delete-it";
import { BlogTagModalUpdate } from "./blog-tag-modal-update";
import type { Fetcher } from "@remix-run/React";
import { Link } from "@remix-run/react";
import { Space } from "antd";
import { goBlogNav } from "~/hooks";

const { SwitcherOutlined } = ic;

export const blogTagColumnsCreate = (lang: string, fetcher: Fetcher) => [
  {
    dataIndex: "name",
    title: "标签名字",
    renderText(_: any, record: any) {
      return (
        <Link to={goBlogNav(lang!, { tag: record.id })}>
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
          <BlogTagModalUpdate />
          <BlogTagDeleteIt fetcher={fetcher} record={record} title={""} />
        </Space>
      );
    },
  },
];
