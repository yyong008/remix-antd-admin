// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { useLoaderData, useNavigate, useParams } from "@remix-run/react";

// components
import { PageContainer, ProTable } from "@ant-design/pro-components";

// utils
import { formatDate } from "~/utils/utils";

// controller
import { AdminSystemMonitorLoginLog } from "~/controllers/admin.system.monitor.login-log";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "System-User" }];
};
// remix:loader
export const loader: LoaderFunction = AdminSystemMonitorLoginLog.loader;

export default function SystemUserRoute() {
  const { dataSource, count } = useLoaderData<typeof loader>();
  const nav = useNavigate();
  const { lang } = useParams();

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
                <div>{record.loginAt ? formatDate(record.loginAt) : "-"}</div>
              );
            },
          },
        ]}
        pagination={{
          total: count,
          pageSize: 10,
          onChange(page, pageSize) {
            nav(
              `/${lang}/admin/system/serve/loginlog?page=${page}&pageSize=${pageSize}`,
            );
          },
        }}
      />
    </PageContainer>
  );
}