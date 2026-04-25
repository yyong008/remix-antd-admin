import React, { useMemo, useState } from "react";
import { Button, Card, Input, message, Modal, Space, Table, Typography } from "antd";
import {
  CloudOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { useDeleteToolsStorage, useToolsStorageList } from "~/api-client/queries/tools-storage";
import { PageContainer } from "~/components/page-container";
import { StorageModal } from "./components/StorageModal/StorageModal";
import { createColumns } from "./components/createColumns";

export function Route() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState({ page: 1, pageSize: 15 });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { data, isLoading, refetch } = useToolsStorageList(page);
  const { mutateAsync: deleteStorage, isPending: isDeleting } = useDeleteToolsStorage();
  const result = (data as any)?.data ?? { list: [], total: 0 };

  // 客户端搜索过滤
  const filteredList = useMemo(() => {
    if (!result.list) return [];
    if (!search.trim()) return result.list;
    const lower = search.toLowerCase();
    return result.list.filter(
      (item: any) =>
        item.name?.toLowerCase().includes(lower) || item.type?.toLowerCase().includes(lower),
    );
  }, [result.list, search]);

  // 当前页大小
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
      title: `确定要删除选中的 ${selectedRowKeys.length} 个文件吗？`,
      okText: "确认",
      cancelText: "取消",
      async onOk() {
        try {
          await deleteStorage({ ids: selectedRowKeys as unknown as number[] });
          setSelectedRowKeys([]);
          void refetch();
          message.success("删除成功");
        } catch (e) {
          message.error(e instanceof Error ? e.message : "删除失败");
        }
      },
    });
  };

  return (
    <PageContainer ghost>
      <div style={{ padding: "0 0 16px 0" }}>
        {/* 顶部操作区 */}
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
              文件存储
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
                批量删除 ({selectedRowKeys.length})
              </Button>
            )}
            <Button icon={<ReloadOutlined />} onClick={() => void refetch()}>
              刷新
            </Button>
            <StorageModal refetch={refetch} />
          </Space>
        </div>

        {/* 统计信息 */}
        <div
          style={{
            display: "flex",
            gap: 32,
            padding: "12px 16px",
            background: "#f5f5f5",
            borderRadius: 6,
            marginBottom: 16,
          }}
        >
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              文件总数
            </Typography.Text>
            <div style={{ fontSize: 20, fontWeight: 600, color: "#262626" }}>{result.total} 个</div>
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              当前页大小
            </Typography.Text>
            <div style={{ fontSize: 20, fontWeight: 600, color: "#1677ff" }}>
              {formatSize(currentPageSize)}
            </div>
          </div>
        </div>

        {/* 搜索 + 表格 */}
        <Card size="small" styles={{ body: { padding: 0 } }}>
          <div style={{ padding: "12px 12px 0 12px" }}>
            <Input
              placeholder="搜索文件名/类型..."
              prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
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
              showTotal: (total) => `共 ${total} 条`,
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
