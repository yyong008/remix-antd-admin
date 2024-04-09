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
import CategoryModal from "~/components/blog/category-list/CategoryModal";
import * as _icon from "@ant-design/icons";

// hooks
import { useFetcherChange } from "~/hooks/useFetcherChange";
import { goBlogNav } from "~/hooks/router/blog.route";

import { AdminBlogCategoryController } from "~/server/controllers/admin.blog.category.controller";

const { SwitcherOutlined } = _icon;

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

export const loader: LoaderFunction = AdminBlogCategoryController.loader;
export const action: ActionFunction = AdminBlogCategoryController.action;

export default function SystemConfigRoute() {
  const {
    data: { dataSource },
  } = useLoaderData<typeof loader>();
  console.log("data", dataSource);
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
