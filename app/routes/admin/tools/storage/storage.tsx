// types
import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";

// remix
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

// components
import { Image } from "antd";
import { PageContainer, ProTable } from "@ant-design/pro-components";

// utils
// import { formatDate } from "~/utils/utils";

import { StorageModal } from "~/components/tools/StorageModal";
import { getStorageList, storageCount } from "~/services/tools/storage";
import { ADMIN_ROUTE_PREFIX, LANG } from "~/constants";
import {
  destroySession,
  getSession,
  getUserId,
} from "~/services/common/auth.server";

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
  const userId = await getUserId(request);
  const session = await getSession(request.headers.get("Cookie"));
  if (!userId) {
    return redirect(`/${LANG}/${ADMIN_ROUTE_PREFIX}/login`, {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
  let { searchParams } = new URL(request.url);
  let page = Number(searchParams.get("page") ?? 1);
  let pageSize = Number(searchParams.get("pageSize") ?? 10);
  let name = searchParams.get("name") ?? "";

  return json({
    count: await storageCount(),
    dataSource: await getStorageList({ page, pageSize, name }),
  });
};

export default function SystemUserRoute() {
  const { dataSource, count } = useLoaderData<typeof loader>();
  const nav = useNavigate();
  const { lang } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

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
            dataIndex: "path",
            title: "预览图",
            ellipsis: true,
            render(_, record) {
              console.log("");
              if (record.type.startsWith("image")) {
                return <Image src={record.path} />;
              }
              return record.path;
            },
          },
          {
            dataIndex: "extName",
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
            title: "尺寸",
            ellipsis: true,
          },
          {
            dataIndex: "userId",
            title: "上传者",
            ellipsis: true,
          },
          {
            dataIndex: "createdAt",
            title: "创建时间",
            ellipsis: true,
          },
        ]}
        pagination={{
          total: count,
          pageSize: Number(searchParams.get("pageSize")) || 10,
          current: Number(searchParams.get("page")) || 0,
          onChange(page, pageSize) {
            nav(
              `/${lang}/${ADMIN_ROUTE_PREFIX}/tools/storage?page=${page}&pageSize=${pageSize}`,
            );
          },
        }}
      />
    </PageContainer>
  );
}
