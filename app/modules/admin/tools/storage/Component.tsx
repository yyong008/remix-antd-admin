import { PageContainer, ProTable } from "@ant-design/pro-components";
import { usePagination, useStorageNav } from "~/hooks";

import { FormatTime } from "~/components/common";
import { Image } from "antd";
import { StorageModal } from "~/components/tools/StorageModal";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Component() {
  const { data } = useLoaderData<typeof loader>();
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
        dataSource={data.dataSource as any[]}
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
          total: data.total,
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
