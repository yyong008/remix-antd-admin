// types
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

// remix
import {
  Link,
  useLoaderData,
  useParams,
  useSearchParams,
} from "@remix-run/react";

// react
import { useEffect, useMemo } from "react";

// components
import { Space, Tag, message } from "antd";
import DeleteIt from "~/components/common/DeleteIt";
import ButtonLink from "~/components/common/ButtonLink";
import FormatTime from "~/components/common/FormatTime";
import { PageContainer, ProTable } from "@ant-design/pro-components";

// hooks
import { useFetcherChange } from "~/hooks";

// controller
import { AdminBlogController } from "~/server/controllers/admin.blog.controller";

// utils
import * as clientUtils from "~/utils";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

export const action: ActionFunction = AdminBlogController.action;
export const loader: LoaderFunction = AdminBlogController.loader;

export default function AdminBlog() {
  const data = useLoaderData<typeof loader>();
  const { dataSource, tag: tagInfo, category: categoryInfo } = data.data;
  const { lang } = useParams();
  let [searchParams] = useSearchParams();
  const fetcher = useFetcherChange();

  const info = useMemo(() => {
    let name = "";
    if (searchParams.get("category") && categoryInfo?.name)
      name = "分类: " + categoryInfo?.name;
    if (searchParams.get("tag") && tagInfo?.name)
      name = "标签: " + tagInfo?.name;

    return { name, categoryName: categoryInfo?.name, tagName: tagInfo?.name };
  }, [categoryInfo?.name, searchParams, tagInfo?.name]);

  useEffect(() => {
    if (data.code === 1) {
      message.error(data.message);
    }
  }, [data]);

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        dataSource={dataSource as any[]}
        headerTitle={info.name}
        toolBarRender={() => [
          <ButtonLink
            key="tag-modal"
            to={`/${lang}/admin/blog/edit`}
            type={"new"}
            content="新建"
          />,
        ]}
        columns={[
          {
            dataIndex: "title",
            title: "文章名字",
            renderText(text, record) {
              return <Link to={`/${lang}/blog/${record.id}`}>{text}</Link>;
            },
          },
          {
            dataIndex: "content",
            title: "文章",
            renderText(text) {
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
            renderText(text) {
              return <FormatTime timeStr={text} />;
            },
          },
          {
            dataIndex: "categories",
            title: "分类",
            renderText(_, record) {
              return <Tag>{info.categoryName}</Tag>;
            },
          },
          {
            dataIndex: "tags",
            title: "标签",
            renderText(_, record) {
              return <Tag>{record?.tags?.name}</Tag>;
            },
          },
          {
            dataIndex: "op",
            title: "操作",
            render(_, record) {
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
        ]}
      />
    </PageContainer>
  );
}
