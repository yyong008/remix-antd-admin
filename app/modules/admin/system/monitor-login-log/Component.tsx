import * as clientUtils from "~/utils";

import { PageContainer, ProTable } from "@ant-design/pro-components";

import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";
import { useLoginLogNav } from "~/hooks";

export function Component() {
  const {
    data: { list: dataSource, count },
  } = useLoaderData<typeof loader>();
  const [navLoginLog] = useLoginLogNav();

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        headerTitle="登录记录"
        rowKey="id"
        showSorterTooltip
        dataSource={dataSource as any[]}
        columns={[
          {
            dataIndex: "name",
            title: "用户名",
            ellipsis: true,
          },
          {
            dataIndex: "ip",
            title: "ip",
            ellipsis: true,
          },
          {
            dataIndex: "address",
            title: "地址",
            ellipsis: true,
          },
          {
            dataIndex: "system",
            title: "系统",
            ellipsis: true,
          },
          {
            dataIndex: "browser",
            title: "浏览器",
            ellipsis: true,
          },
          {
            dataIndex: "loginAt",
            title: "登录时间",
            ellipsis: true,
            render(_, record) {
              return (
                <div>
                  {record.loginAt
                    ? clientUtils.formatDate(record.loginAt)
                    : "-"}
                </div>
              );
            },
          },
        ]}
        pagination={{
          total: count,
          pageSize: 10,
          onChange(page, pageSize) {
            navLoginLog({
              page,
              pageSize,
            });
          },
        }}
      />
    </PageContainer>
  );
}
