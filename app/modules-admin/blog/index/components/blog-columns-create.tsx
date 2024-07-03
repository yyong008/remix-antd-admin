import * as clientUtils from "~/utils/client";

import { ButtonLink, DeleteIt, FormatTime } from "~/components/common";
import { Space, Tag } from "antd";

import { Link } from "@remix-run/react";

export const blogColumnsCreate = (lang: string, fetcher: any, info: any) => [
  {
    dataIndex: "title",
    title: "文章名字",
    renderText(text: string, record: any) {
      return <Link to={`/${lang}/blog/${record.id}`}>{text}</Link>;
    },
  },
  {
    dataIndex: "content",
    title: "文章",
    renderText(text: string) {
      return <div>{clientUtils.removeHtmlTag(text).slice(0, 50)}</div>;
    },
  },
  {
    dataIndex: "author",
    title: "作者",
  },
  {
    dataIndex: "source",
    title: "来源",
  },
  {
    dataIndex: "viewCount",
    title: "查看数",
  },
  {
    dataIndex: "publishedAt",
    title: "发布时间",
    renderText(text: string) {
      return <FormatTime timeStr={text} />;
    },
  },
  {
    dataIndex: "categories",
    title: "分类",
    renderText(_: string, record: any) {
      return <Tag>{info.categoryName}</Tag>;
    },
  },
  {
    dataIndex: "tags",
    title: "标签",
    renderText(_: string, record: any) {
      return <Tag>{record?.tags?.name}</Tag>;
    },
  },
  {
    dataIndex: "op",
    title: "操作",
    render(_: string, record: any) {
      return (
        <Space>
          <ButtonLink
            to={`/${lang}/admin/blog/edit/${record.id}`}
            type={"edit"}
          />
          <DeleteIt fetcher={fetcher} record={record} title={""} />
        </Space>
      );
    },
  },
];
