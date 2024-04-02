// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";

// components
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Space } from "antd";
import ButtonLink from "~/components/common/ButtonLink";

// services
import { createLink } from "~/services/profile/link";
import { getNewsListByCategoryId } from "~/services/news/news";

// constants
import { ADMIN_ROUTE_PREFIX } from "~/constants";
import DeleteIt from "~/components/common/DeleteIt";
import { useFetcherChange } from "~/hooks/useFetcherChange";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

// remix:action
export const action: LoaderFunction = async ({ request }) => {
  const method = request.method;

  if (method === "POST") {
    const data = await request.json();
    // 校验数据

    // 写入数据
    const linkCategory = await createLink(data);

    if (linkCategory === null) {
      return json({
        code: 0,
        message: "创建失败",
        data: {},
      });
    }

    return json({
      code: 0,
      message: "创建成功",
      data: linkCategory,
    });
  } else if (method === "PUT") {
    return json({
      code: 0,
      message: "暂不支持",
      data: {},
    });
  } else if (method === "DELETE") {
    return json({
      code: 0,
      message: "暂不支持",
      data: {},
    });
  }
};

// remix:loader
export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  return json({
    dataSource: await getNewsListByCategoryId(Number(id)),
  });
};

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
            key="create-news-modal"
            type="new"
            content="去添加新闻"
            to={`/${lang}/${ADMIN_ROUTE_PREFIX}/news/edit`}
          />,
        ]}
        columns={[
          {
            dataIndex: "title",
            title: "新闻标题",
          },
          {
            dataIndex: "content",
            title: "新闻内容",
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
            dataIndex: "newId",
            title: "新闻分类",
          },
          {
            dataIndex: "viewSource",
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
                    to={`/${lang}/${ADMIN_ROUTE_PREFIX}/news/edit/${record.id}`}
                  />
                  <DeleteIt
                    fetcher={fetcher}
                    record={record}
                    title={""}
                  ></DeleteIt>
                </Space>
              );
            },
          },
        ]}
      />
    </PageContainer>
  );
}
