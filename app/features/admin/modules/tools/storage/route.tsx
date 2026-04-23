import React, { useMemo, useState } from "react";
import { Button, Card, Flex, Input, message, Space, Statistic, Typography } from "antd";
import { CloudOutlined, DeleteOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";

import { useDeleteToolsStorage, useToolsStorageList } from "~/api-client/queries/tools-storage";
import { AdminTable } from "~/components/admin-table";
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

  const filteredList = useMemo(() => {
    if (!result.list) return [];
    if (!search.trim()) return result.list;
    const lower = search.toLowerCase();
    return result.list.filter(
      (item: any) =>
        item.name?.toLowerCase().includes(lower) ||
        item.path?.toLowerCase().includes(lower) ||
        item.type?.toLowerCase().includes(lower),
    );
  }, [result.list, search]);

  const totalSize = useMemo(() => {
    return (result.list ?? []).reduce((sum: number, item: any) => sum + Number(item.size) || 0, 0);
  }, [result.list]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
  };

  const displayedList = useMemo(() => {
    if (!filteredList.length) return [];
    const start = (page.page - 1) * page.pageSize;
    return filteredList.slice(start, start + page.pageSize);
  }, [filteredList, page.page, page.pageSize]);

  const handleBatchDelete = () => {
    if (!selectedRowKeys.length) return;
    Modal.confirm({
      title: `确定要删除选中的 ${selectedRowKeys.length} 个文件吗？`,
      okText: "确认",
      cancelText: "取消",
      async onOk() {
        try {
          await deleteStorage({ ids: selectedRowKeys as number[] });
          setSelectedRowKeys([]);
          refetch();
          message.success("删除成功");
        } catch (e) {
          message.error(e instanceof Error ? e.message : "删除失败");
        }
      },
    });
  };

  return (
    <PageContainer
      ghost
      style={{ display: "flex", flexDirection: "column", minHeight: "100%", minWidth: 0 }}
    >
      <div
        style={{
          display: "grid",
          minHeight: 560,
          width: "100%",
          minWidth: 0,
          flex: 1,
          alignItems: "stretch",
          gap: 16,
          gridTemplateColumns: "minmax(0, 1fr)",
        }}
      >
        <Card
          title={
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CloudOutlined style={{ color: "#3b82f6" }} />
              文件存储
            </span>
          }
          size="small"
          style={{ width: "100%", maxWidth: "100%", flexShrink: 0 }}
          styles={{ body: { paddingBlock: 12 } }}
          extra={<StorageModal refetch={refetch} />}
        >
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            <Statistic
              title="文件总数"
              value={result.total}
              suffix="个"
              valueStyle={{ fontSize: 24 }}
            />
            <Statistic
              title="当前页大小"
              value={formatSize(totalSize)}
              valueStyle={{ fontSize: 24, color: "#1677ff" }}
            />
          </Space>
        </Card>

        <Card
          size="small"
          title={
            <Typography.Text type="secondary">全部文件 · {filteredList.length} 个</Typography.Text>
          }
          extra={
            <Flex gap={8}>
              {selectedRowKeys.length > 0 && (
                <Button
                  danger
                  type="primary"
                  icon={<DeleteOutlined />}
                  loading={isDeleting}
                  onClick={handleBatchDelete}
                >
                  批量删除 ({selectedRowKeys.length})
                </Button>
              )}
              <Button
                icon={<ReloadOutlined />}
                onClick={() => {
                  void refetch();
                }}
              >
                刷新
              </Button>
              <StorageModal refetch={refetch} />
            </Flex>
          }
        >
          <Flex vertical gap={8}>
            <Input
              placeholder="搜索文件名/路径/类型..."
              prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
            <AdminTable
              rowKey="id"
              size="small"
              tableLayout="fixed"
              bordered
              search={false}
              loading={isLoading}
              options={false}
              dataSource={displayedList}
              rowSelection={{
                selectedRowKeys,
                onChange: setSelectedRowKeys,
              }}
              pagination={{
                total: filteredList.length,
                current: page.page,
                pageSize: page.pageSize,
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`,
                onChange(p, pageSize) {
                  setPage({
                    page: p,
                    pageSize: pageSize ?? page.pageSize,
                  });
                },
              }}
              columns={createColumns({ refetch }) as any}
            />
          </Flex>
        </Card>
      </div>
    </PageContainer>
  );
}
