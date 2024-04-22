// types
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

// remix
import { useLoaderData } from "@remix-run/react";

// components
import { Image } from "antd";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { StorageModal } from "~/components/tools/StorageModal";
import FormatTime from "~/components/common/FormatTime";

// hooks
import { usePagination, useStorageNav } from "~/hooks";

// controller
import { AdminToolsStorageController } from "~/server/controllers/admin.tools.storage.controller";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "System-User" }];
};

export const loader: LoaderFunction = AdminToolsStorageController.loader;
export const action: ActionFunction = AdminToolsStorageController.action;

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
            dataIndex: "path",
            title: "预览图",
            ellipsis: true,
            width: 80,
            render(_, record) {
              if (record.type.startsWith("image")) {
                return <Image style={{ width: "50px" }} src={record.path} />;
              }
              return record.path;
            },
          },
          {
            dataIndex: "name",
            title: "文件名",
            ellipsis: true,
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
            render(_, record) {
              return <div>{(Number(record.size) / 1024).toFixed(0)}KB</div>;
            },
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
            renderText(text) {
              return <FormatTime timeStr={text} />;
            },
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
