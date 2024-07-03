import { ButtonLink, DeleteIt } from "~/components/common";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { PageContainer, ProTable } from "@ant-design/pro-components";

import { Space } from "antd";
import { defaultLang } from "~/config/lang";
import type { loader } from "./loader";
import { useFetcherChange } from "~/hooks";

export function Route() {
  const { data: dataSource } = useLoaderData<typeof loader>();
  const { lang = defaultLang } = useParams();
  const fetcher = useFetcherChange();
  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        headerTitle="新闻"
        size="small"
        search={false}
        dataSource={dataSource as any[]}
        toolBarRender={() => [
          <ButtonLink
            key="create-news-modal"
            type="new"
            content="添加新闻"
            to={`/${lang}/admin/news/edit`}
          />,
        ]}
        columns={[
          {
            dataIndex: "title",
            title: "新闻标题",
            renderText(text, record, index, action) {
              return <Link to={`/${lang}/news/${record.id}`}>{text}</Link>;
            },
          },
          {
            dataIndex: "content",
            title: "新闻内容",
            render(_, record) {
              return <div>{record.content.slice(0, 20)}</div>;
            },
          },
          {
            dataIndex: "author",
            title: "作者",
          },
          {
            dataIndex: "source",
            title: "新闻来源",
          },
          {
            dataIndex: "newsId",
            title: "新闻分类",
          },
          {
            dataIndex: "viewCount",
            title: "查看次数",
          },
          {
            dataIndex: "op",
            title: "操作",
            render(_, record) {
              return (
                <Space>
                  <ButtonLink
                    type="edit"
                    to={`/${lang}/admin/news/edit/${record.id}`}
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
