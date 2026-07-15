import React, { useMemo, useState } from "react";
import { Button, Card, Input, message, Modal, Space, Table, theme, Typography } from "antd";
import { CloudOutlined, DeleteOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import type { MetaFunction } from "react-router";

import {
  useDeleteToolsStorage,
  useToolsStorageList,
} from "~/api-client/queries/tools/tools-storage";
import { PageContainer } from "~/components/page-container";
import { m } from "~/paraglide/messages";
import { StorageUploadModal } from "./components/storage-upload-modal/storage-upload-modal";
import { createColumns } from "./components/create-columns";

export const meta: MetaFunction = () => {
  return [{ title: m.tools_storage_title() }];
};

export default function Route() {
  const { token } = theme.useToken();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState({ page: 1, pageSize: 15 });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { data, isLoading, refetch } = useToolsStorageList(page);
  const { mutateAsync: deleteStorage, isPending: isDeleting } = useDeleteToolsStorage();
  const result = (data as any)?.data ?? { list: [], total: 0 };

  const filteredList = useMemo(() => {
    if (!result.list) return [];
    if (!search.trim()) return result.list;
    const lower = search.toLowerCase();
    return result.list.filter(
      (item: any) =>
        item.name?.toLowerCase().includes(lower) || item.type?.toLowerCase().includes(lower),
    );
  }, [result.list, search]);

  const currentPageSize = useMemo(() => {
    return (result.list ?? []).reduce((sum: number, item: any) => sum + Number(item.size) || 0, 0);
  }, [result.list]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
  };

  const handleBatchDelete = () => {
    if (!selectedRowKeys.length) return;
    Modal.confirm({
      title: m.tools_storage_confirm_batch_delete({ count: selectedRowKeys.length }),
      okText: m.tools_storage_action_delete(),
      cancelText: m.tools_storage_upload_clear(),
      async onOk() {
        try {
          await deleteStorage({ ids: selectedRowKeys as unknown as number[] });
          setSelectedRowKeys([]);
          void refetch();
          message.success(m.tools_storage_toast_deleted());
        } catch (e) {
          message.error(e instanceof Error ? e.message : m.tools_storage_toast_delete_failed());
        }
      },
    });
  };

  return (
    <PageContainer ghost>
      <div style={{ padding: "0 0 16px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <CloudOutlined style={{ fontSize: 20, color: "#3b82f6" }} />
            <Typography.Title level={4} style={{ margin: 0 }}>
              {m.tools_storage_title()}
            </Typography.Title>
          </div>
          <Space>
            {selectedRowKeys.length > 0 && (
              <Button
                danger
                icon={<DeleteOutlined />}
                loading={isDeleting}
                onClick={handleBatchDelete}
              >
                {m.tools_storage_batch_delete({ count: selectedRowKeys.length })}
              </Button>
            )}
            <Button icon={<ReloadOutlined />} onClick={() => void refetch()}>
              {m.tools_storage_refresh()}
            </Button>
            <StorageUploadModal refetch={refetch} />
          </Space>
        </div>

        <div
          style={{
            display: "flex",
            gap: 32,
            padding: "12px 16px",
            background: token.colorFillAlter,
            borderRadius: 6,
            marginBottom: 16,
          }}
        >
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {m.tools_storage_total_files()}
            </Typography.Text>
            <div style={{ fontSize: 20, fontWeight: 600, color: token.colorText }}>
              {result.total}
            </div>
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {m.tools_storage_current_page_size()}
            </Typography.Text>
            <div style={{ fontSize: 20, fontWeight: 600, color: token.colorPrimary }}>
              {formatSize(currentPageSize)}
            </div>
          </div>
        </div>

        <Card size="small" styles={{ body: { padding: 0 } }}>
          <div style={{ padding: "12px 12px 0 12px" }}>
            <Input
              placeholder={m.tools_storage_search_placeholder()}
              prefix={<SearchOutlined style={{ color: token.colorTextQuaternary }} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
              style={{ marginBottom: 12 }}
            />
          </div>
          <Table
            rowKey="id"
            size="small"
            bordered
            loading={isLoading}
            dataSource={filteredList}
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
            }}
            pagination={{
              total: result.total,
              current: page.page,
              pageSize: page.pageSize,
              showSizeChanger: true,
              showTotal: (total) => m.tools_storage_pagination_total({ total }),
              onChange(p, pageSize) {
                setPage({ page: p, pageSize: pageSize ?? page.pageSize });
                setSelectedRowKeys([]);
              },
            }}
            columns={createColumns({ refetch }) as any}
          />
        </Card>
      </div>
    </PageContainer>
  );
}
