// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { useLoaderData } from "@remix-run/react";

// components
import { PageContainer, ProTable } from "@ant-design/pro-components";

// utils
import * as clientUtils from "~/utils";

// controller
import { AdminSystemMonitorLoginLogController } from "~/server/controllers/system/admin.system.monitor.login-log.controller";

// hooks
import { useLoginLogNav } from "~/hooks";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "System-User" }];
};

// remix:loader
export const loader: LoaderFunction =
  AdminSystemMonitorLoginLogController.loader;

export default function SystemUserRoute() {
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
