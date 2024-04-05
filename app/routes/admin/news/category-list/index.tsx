// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";

// components
import { PageContainer, ProTable } from "@ant-design/pro-components";
import NewsCategoryModal from "./NewsCategoryModal";
import { Space, Tag } from "antd";
import DeleteIt from "~/components/common/DeleteIt";

// hooks
import { useFetcherChange } from "~/hooks/useFetcherChange";

// constants
import { ADMIN_ROUTE_PREFIX } from "~/constants";

// services
import { getUserId } from "~/services/common/auth.server";
import {
  createNewsCategory,
  getNewsCategoryListById,
} from "~/services/news/news-category";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

// remix:action
export const action: LoaderFunction = async ({ request }) => {
  const method = request.method;

  if (method === "POST") {
    const data = await request.json();
    const userId = await getUserId(request);
    // 校验数据

    // 写入数据
    const linkCategory = await createNewsCategory({
      ...data,
      userId,
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
  } else if (method === "DELETE") {
    // 删除
    return json({
      code: 0,
      message: "暂不支持",
      data: {},
    });
  } else if (method === "PUT") {
    // 更新
    return json({
      code: 0,
      message: "暂不支持",
      data: {},
    });
  }
};

// remix:loader
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  return json({
    dataSource: await getNewsCategoryListById(userId!),
  });
};

export default function SystemConfigRoute() {
  const { dataSource } = useLoaderData<typeof loader>();
  const fetcher = useFetcherChange();
  const { lang } = useParams();

  return (
    <PageContainer>
      <ProTable
        size="small"
        headerTitle="新闻分类"
        search={false}
        toolBarRender={() => [
          <NewsCategoryModal
            key="news-category-modal-create"
            record={{}}
            fetcher={fetcher}
          />,
        ]}
        dataSource={dataSource as any[]}
        columns={[
          {
            dataIndex: "name",
            title: "新闻分类名",
            render(_, record) {
              return (
                <Link
                  to={`/${lang}/${ADMIN_ROUTE_PREFIX}/news/category/${record.id}`}
                >
                  <Tag color="blue">{record.name}</Tag>
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
            render(_, record) {
              return (
                <Space>
                  <NewsCategoryModal
                    key="news-category-modal-modify"
                    record={record}
                    fetcher={fetcher}
                  />
                  <DeleteIt
                    record={record}
                    fetcher={fetcher}
                    title="删除"
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
