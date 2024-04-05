// types
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

// remix
import { Link, useLoaderData, useParams } from "@remix-run/react";

// components
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Space } from "antd";
import DeleteIt from "~/components/common/DeleteIt";
import CategoryModal from "./CategoryModal";
import * as _icon from "@ant-design/icons";

// hooks
import { useFetcherChange } from "~/hooks/useFetcherChange";
import { goBlogNav } from "~/hooks/router/blog.route";

import { BlogCategoryListHandler } from "~/server/blog/category-list/index";

export const loader: LoaderFunction = BlogCategoryListHandler.loader;
export const action: ActionFunction = BlogCategoryListHandler.action;

const { SwitcherOutlined } = _icon;

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

export default function SystemConfigRoute() {
  const {
    data: { dataSource },
  } = useLoaderData<typeof loader>();
  const { lang } = useParams();
  const fetcher = useFetcherChange();

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        dataSource={dataSource as any[]}
        toolBarRender={() => [
          <CategoryModal fetcher={fetcher} record={{}} key="tag-modal" />,
        ]}
        columns={[
          {
            dataIndex: "name",
            title: "标签名字",
            renderText(_, record) {
              return (
                <Link to={goBlogNav(lang!, { category: record.id })}>
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
            title: "标签内容",
          },
          {
            dataIndex: "op",
            title: "操作",
            render(_, record) {
              return (
                <Space>
                  <CategoryModal
                    fetcher={fetcher}
                    record={record}
                    key="mod-category-modal"
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
