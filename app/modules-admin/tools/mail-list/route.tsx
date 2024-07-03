import { ButtonLink, DeleteIt } from "~/components/common";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useFetcherChange, useMailNav } from "~/hooks";
import { useLoaderData, useParams } from "@remix-run/react";

import { Space } from "antd";
import type { loader } from "./loader";

export function Route() {
  const { data } = useLoaderData<typeof loader>();
  const [navMail] = useMailNav();
  const { lang } = useParams();
  const fetcher = useFetcherChange();
  const { list: dataSource, count: total } = data;

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        headerTitle="登录记录"
        rowKey="id"
        showSorterTooltip
        dataSource={dataSource as any[]}
        toolBarRender={() => [
          <ButtonLink
            key="create-mail"
            to={`/${lang!}/admin/tools/mail`}
            type={"new"}
            content="去新建"
          />,
        ]}
        columns={[
          {
            dataIndex: "subject",
            title: "邮件标题",
            ellipsis: true,
          },
          {
            dataIndex: "to",
            title: "接收邮件人",
            ellipsis: true,
          },
          {
            dataIndex: "content",
            title: "邮件内容",
            ellipsis: true,
          },
          {
            dataIndex: "host",
            title: "Host",
            ellipsis: true,
          },
          {
            dataIndex: "port",
            title: "端口",
            ellipsis: true,
          },
          {
            dataIndex: "user",
            title: "用户名",
            ellipsis: true,
          },
          {
            dataIndex: "pass",
            title: "输入授权码或密码",
            ellipsis: true,
          },
          {
            dataIndex: "op",
            title: "操作",
            fixed: "right",
            ellipsis: true,
            render(_, record) {
              return (
                <Space>
                  <ButtonLink
                    key="create-mail"
                    to={`/${lang!}/admin/tools/mail/${record.id}`}
                    type={"edit"}
                  />
                  <DeleteIt fetcher={fetcher} record={record} title={"用户"} />
                </Space>
              );
            },
          },
        ]}
        pagination={{
          total,
          pageSize: 10,
          onChange(page, pageSize) {
            navMail({
              page,
              pageSize,
            });
          },
        }}
      />
    </PageContainer>
  );
}
