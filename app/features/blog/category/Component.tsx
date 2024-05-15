import * as _icon from "@ant-design/icons";

import { Link, useLoaderData, useParams } from "@remix-run/react";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { goBlogNav, useFetcherChange } from "~/hooks";

import CategoryModal from "~/components/blog/category-list/CategoryModal";
import { DeleteIt } from "~/components/common";
import { Space } from "antd";
import type { loader } from "./loader";

const { SwitcherOutlined } = _icon;

export function Component() {
  const { data } = useLoaderData<typeof loader>();
  const { lang } = useParams();
  const fetcher = useFetcherChange();

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        dataSource={data as any[]}
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
