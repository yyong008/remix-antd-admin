// types
import * as _icon from "@ant-design/icons";

import { Link, useLoaderData, useParams } from "@remix-run/react";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { goBlogNav, useFetcherChange } from "~/hooks";

import { DeleteIt } from "~/components/common";
import { Space } from "antd";
import TagModal from "~/components/blog/tag-list/TagModal";
import type { loader } from "./loader";

const { SwitcherOutlined } = _icon;

export function Component() {
  const data = useLoaderData<typeof loader>();
  const { lang } = useParams();
  const fetcher = useFetcherChange();
  // const actionData = useActionData();

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        dataSource={data.code === 1 ? [] : data.data}
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
