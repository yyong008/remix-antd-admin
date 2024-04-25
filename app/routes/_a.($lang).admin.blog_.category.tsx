// types
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

// remix
import { Link, useLoaderData, useParams } from "@remix-run/react";

// components
import { Space } from "antd";
import * as _icon from "@ant-design/icons";
import { PageContainer, ProTable } from "@ant-design/pro-components";

import { DeleteIt } from "~/components/common";
import CategoryModal from "~/components/blog/category-list/CategoryModal";

// hooks
import { useFetcherChange, goBlogNav } from "~/hooks";

// controller
import { AdminBlogCategoryController } from "~/server/controllers/blog/admin.blog.category.controller";

const { SwitcherOutlined } = _icon;

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

// action-loader
export const loader: LoaderFunction = AdminBlogCategoryController.loader;
export const action: ActionFunction = AdminBlogCategoryController.action;

export default function AdminBlogCategoryRoute() {
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
            title: "分类名字",
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
