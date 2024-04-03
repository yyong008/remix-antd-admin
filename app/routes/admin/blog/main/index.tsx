// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";

// components
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Space, Tag } from "antd";

// constants
// import { ADMIN_ROUTE_PREFIX } from "~/constants";
import DeleteIt from "~/components/common/DeleteIt";
import { useFetcherChange } from "~/hooks/useFetcherChange";
import {
  createBlogCategory,
  getBlogListById,
} from "~/services/blog/blog-category";
import { getUserId } from "~/services/common/auth.server";

import { URLSearchParams } from "url";
import ButtonLink from "~/components/common/ButtonLink";
import { ADMIN_ROUTE_PREFIX } from "~/constants";

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
    const linkCategory = await createBlogCategory({
      ...data,
      userId: await getUserId(request),
    });

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
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const userId = await getUserId(request);
  return json({
    dataSource: await getBlogListById(
      userId!,
      Number(searchParams.get("category")),
      Number(searchParams.get("tag")),
    ),
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
            key="tag-modal"
            to={`/${lang}/${ADMIN_ROUTE_PREFIX}/blog/edit`}
            type={"new"}
            content="新建"
          />,
        ]}
        columns={[
          {
            dataIndex: "title",
            title: "文章名字",
          },
          {
            dataIndex: "content",
            title: "文章",
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
              console.log("id", record);
              return (
                <Space>
                  <ButtonLink
                    to={`/${lang}/${ADMIN_ROUTE_PREFIX}/blog/edit/${record.id}`}
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
