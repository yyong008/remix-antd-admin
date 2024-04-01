// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

// components
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { createLink, getLinkListById } from "~/services/profile/link";
import { useFetcherChange } from "~/hooks/useFetcherChange";
import LinkModal from "./LinkModal";
import { Space } from "antd";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

// remix:action
export const action: LoaderFunction = async ({ request }) => {
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
};

// remix:loader
export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  return json({
    dataSource: await getLinkListById(Number(id)),
  });
};

export default function SystemConfigRoute() {
  const { dataSource } = useLoaderData<typeof loader>();
  const fetcher = useFetcherChange();

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        dataSource={dataSource as any[]}
        toolBarRender={() => [
          <LinkModal record={{}} fetcher={fetcher} key="create-link-modal" />,
        ]}
        columns={[
          {
            dataIndex: "name",
            title: "链接名",
          },
          {
            dataIndex: "url",
            title: "链接地址",
            renderText(text, record, index, action) {
              return (
                <Link to={record.url} target="_blank">
                  {record.url}
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
                  <LinkModal
                    record={record}
                    fetcher={fetcher}
                    key="modify-link-modal"
                  />
                </Space>
              );
            },
          },
        ]}
      />
    </PageContainer>
  );
}
