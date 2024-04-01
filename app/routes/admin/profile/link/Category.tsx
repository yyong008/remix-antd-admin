// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";

// components
import { PageContainer, ProTable } from "@ant-design/pro-components";
import {
  createLinkCategory,
  getLinkCategoryList,
} from "~/services/profile/link-category";
import LinkCategoryModal from "./LinkCategoryModal";
import { useFetcherChange } from "~/hooks/useFetcherChange";
import { Space, Tag } from "antd";
import DeleteIt from "~/components/common/DeleteIt";
import { ADMIN_ROUTE_PREFIX } from "~/constants";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

// remix:action
export const action: LoaderFunction = async ({ request }) => {
  const data = await request.json();
  // 校验数据

  // 写入数据
  const linkCategory = await createLinkCategory(data);

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
};

// remix:loader
export const loader: LoaderFunction = async () => {
  // 授权认证
  return json({
    dataSource: await getLinkCategoryList(),
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
        headerTitle="链接分类管理"
        search={false}
        toolBarRender={() => [
          <LinkCategoryModal
            key="link-category-modal-create"
            record={{}}
            fetcher={fetcher}
          />,
        ]}
        dataSource={dataSource as any[]}
        columns={[
          {
            dataIndex: "name",
            title: "链接分类名",
            render(_, record) {
              return (
                <Link
                  to={`/${lang}/${ADMIN_ROUTE_PREFIX}/profile/link/category/${record.id}`}
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
                  <LinkCategoryModal
                    key="link-category-modal-modify"
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
