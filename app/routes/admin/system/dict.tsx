// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useParams } from "@remix-run/react";

// components
import * as _icon from "@ant-design/icons";
import { Button, Space, Tag, Tooltip } from "antd";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import DictModal from "~/components/system/dict/CreateDictModel";
import DeleteIt from "~/components/common/DeleteIt";
import StatusType from "~/components/common/StatusType";

// service
import { getDictList } from "~/services/system/dict";

// utils
import { formatDate } from "~/utils/utils";

// constants
import { ADMIN_ROUTE_PREFIX } from "~/constants";

// remix:loader
export const loader: LoaderFunction = async () => {
  return json({
    dataSource: await getDictList(),
  });
};

// remix:meta
export const meta: MetaFunction = () => {
  return [
    { title: "System-Dict" },
    { name: "System-Dict", content: "System-Dict" },
  ];
};

const { EyeOutlined } = _icon;

export default function SystemDictItemRoute() {
  const { dataSource } = useLoaderData<typeof loader>();
  const { lang } = useParams();
  const fetcher = useFetcher();

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        headerTitle="字典项目"
        toolBarRender={() => [
          <DictModal record={{}} key="create-dict-modal" />,
        ]}
        dataSource={dataSource as any[]}
        columns={[
          {
            dataIndex: "name",
            title: "字典名",
          },
          {
            dataIndex: "code",
            title: "字典值(编码)",
            render(_, record) {
              return (
                <Link
                  to={`/${lang}/${ADMIN_ROUTE_PREFIX}/system/dict-item/${record.id}`}
                >
                  <Tag color="yellow">{record.code}</Tag>
                </Link>
              );
            },
          },
          {
            dataIndex: "description",
            title: "描述",
          },
          {
            dataIndex: "remark",
            title: "标记",
          },
          {
            dataIndex: "status",
            title: "状态",
            renderText(text, record, index, action) {
              return <StatusType status={record.status} />;
            },
          },
          {
            dataIndex: "createdAt",
            title: "创建时间",
            render(_, record) {
              return (
                <div>
                  {record.createdAt ? formatDate(record.createdAt) : "-"}
                </div>
              );
            },
          },
          {
            dataIndex: "updatedAt",
            title: "更新时间",
            render(_, record) {
              return (
                <div>
                  {record.updatedAt ? formatDate(record.updatedAt) : "-"}
                </div>
              );
            },
          },
          {
            dataIndex: "op",
            title: "操作",
            render(_, record) {
              return (
                <Space size="small">
                  <Tooltip title="预览字典">
                    <Link to={`/${lang}/system/dict-item/${record.id}`}>
                      <Button type="link" icon={<EyeOutlined />}></Button>
                    </Link>
                  </Tooltip>
                  <DictModal record={record} key="create-dict-modal" />
                  <DeleteIt
                    title="确定要删除此部门吗?"
                    fetcher={fetcher}
                    record={record}
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
