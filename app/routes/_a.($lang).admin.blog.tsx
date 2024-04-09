// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { Link, useLoaderData, useParams } from "@remix-run/react";

// components
import { Space, Tag } from "antd";
import DeleteIt from "~/components/common/DeleteIt";
import ButtonLink from "~/components/common/ButtonLink";
import { PageContainer, ProTable } from "@ant-design/pro-components";

// hooks
import { useFetcherChange } from "~/hooks/useFetcherChange";

// controller
import { AdminBlogController } from "~/controllers/admin.blog.controller";
import { removeHtmlTag } from "~/utils";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

export const action: LoaderFunction = AdminBlogController.action;
export const loader: LoaderFunction = AdminBlogController.loader;

export default function SystemConfigRoute() {
  const { dataSource } = useLoaderData<typeof loader>();
  const { lang } = useParams();
  const fetcher = useFetcherChange();

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        dataSource={dataSource as any[]}
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
            renderText(text, record, index, action) {
              return <Link to={`/${lang}/blog/${record.id}`}>{text}</Link>;
            },
          },
          {
            dataIndex: "content",
            title: "文章",
            renderText(text, record, index, action) {
              return <div>{removeHtmlTag(text).slice(0, 100)}</div>;
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
          },
          {
            dataIndex: "categories",
            title: "分类",
            renderText(_, record) {
              return <Tag>{record?.categories.name}</Tag>;
            },
          },
          {
            dataIndex: "tags",
            title: "标签",
            renderText(_, record) {
              return <Tag>{record?.tags.name}</Tag>;
            },
          },
          {
            dataIndex: "userId",
            title: "作者id",
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
