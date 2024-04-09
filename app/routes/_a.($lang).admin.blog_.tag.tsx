// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import {
  Link,
  // useActionData,
  useLoaderData,
  useParams,
} from "@remix-run/react";

// components
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Space } from "antd";

// constants
import DeleteIt from "~/components/common/DeleteIt";
import { useFetcherChange } from "~/hooks/useFetcherChange";
import TagModal from "~/components/blog/tag-list/TagModal";
import * as _icon from "@ant-design/icons";

// services
import { goBlogNav } from "~/hooks/router/blog.route";
import { AdminBlogTagController } from "~/controllers/admin.blog.tag.controller";

const { SwitcherOutlined } = _icon;

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

// remix:action
export const action: LoaderFunction = AdminBlogTagController.action;

// remix:loader
export const loader: LoaderFunction = AdminBlogTagController.loader;

export default function SystemConfigRoute() {
  const { dataSource } = useLoaderData<typeof loader>();
  const { lang } = useParams();
  const fetcher = useFetcherChange();
  // const actionData = useActionData();

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        dataSource={dataSource as any[]}
        toolBarRender={() => [
          <TagModal fetcher={fetcher} record={{}} key="tag-modal" />,
        ]}
        columns={[
          {
            dataIndex: "name",
            title: "标签名字",
            renderText(text, record, index, action) {
              return (
                <Link to={goBlogNav(lang!, { tag: record.id })}>
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
            title: "描述",
          },
          {
            dataIndex: "op",
            title: "操作",
            render(_, record) {
              return (
                <Space>
                  <TagModal
                    fetcher={fetcher}
                    record={record}
                    key="mod-tag-modal"
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
