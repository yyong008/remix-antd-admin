import { PageContainer, ProTable } from "@ant-design/pro-components";

import { FeedbackModalCreate } from "./components/FeedbackModalCreate";
import { FormatTime } from "@/components/common";
import { Image } from "antd";
import { getFeedbacks } from "~/admin/apis/admin/docs";
import { useSimplePage } from "~/hooks/useSimplePage";
import FeedbackModalUpdate from "./components/FeedbackModalUpdate";
import { useTranslation } from "react-i18next";
import { useTableShowTotal } from "~/hooks/useTableShowTotal";

export function Route() {
  const { page, setPage, data, isLoading, getPage } =
    useSimplePage(getFeedbacks);
  const { t } = useTranslation("feedback");
  const showTotal = useTableShowTotal();
  const columns = [
    {
      dataIndex: "id",
      title: t("list.table.id"),
    },
    {
      dataIndex: "content",
      title: t("list.table.content"),
    },
    {
      dataIndex: "url",
      title: t("list.table.image"),
      render(_: any, record: any) {
        return (
          <div className="h-[50px] w-[100px] overflow-hidden origin-center">
            <Image src={record.url}></Image>
          </div>
        );
      },
    },
    {
      dataIndex: "createdAt",
      title: t("list.table.createdAt"),
      render(_: any, record: any) {
        return <FormatTime timeStr={record.createdAt} />;
      },
    },
    {
      dataIndex: "op",
      title: t("list.table.op"),
      render(_: any, record: any) {
        return <div>
          <FeedbackModalUpdate record={record} refetch={getPage} />
        </div>
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        headerTitle={t("list.title")}
        size="small"
        search={false}
        loading={isLoading}
        dataSource={data?.list ?? []}
        columns={columns}
        options={{
          reload: getPage,
        }}
        toolBarRender={() => [
          <FeedbackModalCreate
            key="changelog-modal-create"
            refetch={getPage}
          />,
        ]}
        pagination={{
          total: data.total || 0,
          pageSize: page?.pageSize || 10,
          showTotal,
          onChange(page, pageSize) {
            setPage({ page, pageSize });
          },
        }}
      />
    </PageContainer>
  );
}
