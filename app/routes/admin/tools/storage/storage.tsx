// types
import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";

// remix
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

// components
import { Image } from "antd";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { StorageModal } from "~/components/tools/StorageModal";

// services
import { auth } from "~/services/common/auth.server";
import { getStorageList, storageCount } from "~/services/tools/storage";

// utils
import { getPaginationByRequest } from "~/utils/pagination.util";

// hooks
import { usePagination } from "~/hooks/usePagination";
import { useStorageNav } from "~/hooks/router/storage.route";

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
  params,
}: LoaderFunctionArgs) => {
  const [userId, redirectToLogin] = await auth({
    request,
    params,
  } as LoaderFunctionArgs);

  if (!userId) {
    return redirectToLogin();
  }
  const { page, pageSize, name } = getPaginationByRequest(request);

  return json({
    total: await storageCount(),
    dataSource: await getStorageList({ page, pageSize, name }),
  });
};

export default function SystemStorageRoute() {
  const { dataSource, total } = useLoaderData<typeof loader>();
  const { pageSize, current } = usePagination();
  const [navStorage] = useStorageNav();

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
          total,
          pageSize,
          current,
          onChange(page, pageSize) {
            navStorage({ page, pageSize });
          },
        }}
      />
    </PageContainer>
  );
}
