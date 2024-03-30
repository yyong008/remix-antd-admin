// types
import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";

// remix
import { useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { json } from "@remix-run/node";

// components

import { PageContainer, ProTable } from "@ant-design/pro-components";

// utils
// import { formatDate } from "~/utils/utils";

import { getLoginLogList, loginLogCount } from "~/services/system/login-log";
import { StorageModal } from "~/components/tools/StorageModal";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    { title: "System-User" },
    { name: "System-User", content: "System-User" },
  ];
};
// remix:loader
export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  let { searchParams } = new URL(request.url);
  let page = Number(searchParams.get("page") ?? 1);
  let pageSize = Number(searchParams.get("pageSize") ?? 10);
  let name = searchParams.get("name") ?? "";

  return json({
    count: await loginLogCount(),
    dataSource: await getLoginLogList({ page, pageSize, name }),
  });
};

export default function SystemUserRoute() {
  const { dataSource, count } = useLoaderData<typeof loader>();
  const nav = useNavigate();
  const { lang } = useParams();

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        headerTitle="文件上传"
        rowKey="id"
        showSorterTooltip
        dataSource={dataSource as any[]}
        toolBarRender={() => [<StorageModal key="storage" />]}
        columns={[
          {
            dataIndex: "name",
            title: "文件名",
            ellipsis: true,
          },
          {
            dataIndex: "url",
            title: "预览图",
            ellipsis: true,
          },
          {
            dataIndex: "suffix",
            title: "文件后缀",
            ellipsis: true,
          },
          {
            dataIndex: "type",
            title: "类型",
            ellipsis: true,
          },
          {
            dataIndex: "size",
            title: "浏览器",
            ellipsis: true,
          },
          {
            dataIndex: "user_name",
            title: "上传者",
            ellipsis: true,
            // render(_, record) {
            //   return (
            //     <div>{record.loginAt ? formatDate(record.loginAt) : "-"}</div>
            //   );
            // },
          },
          {
            dataIndex: "createdAt",
            title: "创建时间",
            ellipsis: true,
          },
        ]}
        pagination={{
          total: count,
          pageSize: 10,
          onChange(page, pageSize) {
            nav(
              `/${lang}/system/serve/loginlog?page=${page}&pageSize=${pageSize}`,
            );
          },
        }}
      />
    </PageContainer>
  );
}
