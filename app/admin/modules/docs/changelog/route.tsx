import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Space, Tag } from "antd";

import { ChangeLogCreateModal } from "./components/ChangeLogModalCreate";
import ChangeLogUpdateModal from "./components/ChangeLogModalUpdate";
import { DeleteIt } from "./components/delete-it";
import { FormatTime } from "@/components/common";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getDocs } from "~/admin/apis/admin/docs";
const typeMap = {
  1: {
    color: "blue",
    text: "重大更新",
  },
  2: {
    color: "green",
    text: "功能更新",
  },
  3: {
    color: "volcano",
    text: "Bug 修复",
  },
};

export function Route() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    total: 0,
    list: [],
  });
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
  });
  const getChangelogList = async () => {
    setIsLoading(true);
    const res: any = await getDocs(page);
    console.log(res);

    setData({
      total: res.data?.total,
      list: res.data?.list,
    });
    setIsLoading(false);
  };

  const params = useParams();

  const columns = [
    {
      dataIndex: "publish_version",
      title: "版本",
    },
    {
      dataIndex: "publish_name",
      title: "发布者",
    },
    {
      dataIndex: "type",
      title: "更新类型",
      render: (_: any, record: { type: 1 | 2 | 3 }) => (
        <Tag color={typeMap?.[record.type]?.color}>
          {typeMap?.[record.type]?.text}
        </Tag>
      ),
    },
    {
      dataIndex: "content",
      title: "发布内容",
      ellipsis: true,
    },
    {
      dataIndex: "url",
      title: "跳转链接",
      ellipsis: true,
      render(_: any, record: any) {
        return <a href={record.url}>{record.url}</a>;
      },
    },
    {
      dataIndex: "publish_time",
      title: "发布时间",
      render(_: any, record: any) {
        return <FormatTime timeStr={record.publish_time} />;
      },
    },
    {
      dataIndex: "createdAt",
      title: "创建时间",
      render(_: any, record: any) {
        return <FormatTime timeStr={record.createdAt} />;
      },
    },
    {
      dataIndex: "updatedAt",
      title: "更新时间",
      render(_: any, record: any) {
        return <FormatTime timeStr={record.updatedAt} />;
      },
    },
    {
      dataIndex: "op",
      title: "操作",
      render(_: any, record: any) {
        return (
          <Space>
            <ChangeLogUpdateModal
              key="changelog-modal-modify"
              record={record}
              refetch={getChangelogList}
            />
            <DeleteIt record={record} title={""} refetch={getChangelogList} />
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    getChangelogList();
  }, []);
  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        headerTitle="更新日志"
        size="small"
        search={false}
        dataSource={data?.list ?? []}
        loading={isLoading}
        columns={columns}
        toolBarRender={() => [
          <ChangeLogCreateModal
            key="changelog-modal-create"
            refetch={getChangelogList}
          />,
        ]}
        options={{
          reload: getChangelogList,
        }}
        pagination={{
          total: data?.total,
          pageSize: Number(params.pageSize ?? 10),
          onChange(page, pageSize) {
            setPage({ page, pageSize });
          },
        }}
      />
    </PageContainer>
  );
}
