import * as _icon from "@ant-design/icons";

import { Button, Space, Tag, Tooltip } from "antd";
import { DeleteIt, FormatTime, StatusType } from "~/components/common";
import { Link, useFetcher, useLoaderData, useParams } from "@remix-run/react";
import { PageContainer, ProTable } from "@ant-design/pro-components";

import DictModal from "~/modules/admin/system/dict/components/dict/CreateDictModel";
import type { loader } from "./loader";

const { EyeOutlined } = _icon;

export function Route() {
  const { data: dataSource } = useLoaderData<typeof loader>();
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
              return <TagLink lang={lang} record={record} />;
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
            renderText(_, record) {
              return <StatusType status={record.status} />;
            },
          },
          {
            dataIndex: "createdAt",
            title: "创建时间",
            render(_, record) {
              return <FormatTime timeStr={record.createdAt} />;
            },
          },
          {
            dataIndex: "updatedAt",
            title: "更新时间",
            render(_, record) {
              return <FormatTime timeStr={record.updatedAt} />;
            },
          },
          {
            dataIndex: "op",
            title: "操作",
            render(_, record) {
              return (
                <Space size="small">
                  <Tooltip title="预览字典">
                    <Link to={`/${lang}/admin/system/dict-item/${record.id}`}>
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

function TagLink({ lang, record }: any) {
  return (
    <Link to={`/${lang}/admin/system/dict-item/${record.id}`}>
      <Tag color="yellow">{record.code}</Tag>
    </Link>
  );
}
