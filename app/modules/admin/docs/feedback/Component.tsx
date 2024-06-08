import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useFeedbackNav, useFetcherChange } from "~/hooks";
import { useLoaderData, useParams } from "@remix-run/react";

import FeedbackModal from "~/components/docs/FeedbackModal";
import { FormatTime } from "~/components/common";
import { Image } from "antd";
import type { loader } from "./loader";

export function Component() {
  const { data } = useLoaderData<typeof loader>();
  const { total = 0, list = [] } = data;
  const params = useParams();
  const [navFeedback] = useFeedbackNav();
  const fetcher = useFetcherChange();

  const columns = [
    {
      dataIndex: "id",
      title: "反馈编号",
    },
    {
      dataIndex: "content",
      title: "反馈内容",
    },
    {
      dataIndex: "url",
      title: "反馈图片",
      render(_: any, record: any) {
        return (
          <div className="w-[100px]">
            <Image src={record.url}></Image>
          </div>
        );
      },
    },
    {
      dataIndex: "createdAt",
      title: "反馈时间",
      render(_: any, record: any) {
        return <FormatTime timeStr={record.createdAt} />;
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle="反馈内容"
        size="small"
        search={false}
        dataSource={list ?? []}
        columns={columns}
        toolBarRender={() => [
          <FeedbackModal
            key="changelog-modal-create"
            record={{}}
            fetcher={fetcher}
          />,
        ]}
        pagination={{
          total,
          pageSize: Number(params.pageSize ?? 10),
          onChange(page, pageSize) {
            navFeedback({ page, pageSize });
          },
        }}
      />
    </PageContainer>
  );
}
