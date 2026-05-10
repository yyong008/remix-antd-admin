import { ReloadOutlined } from "@ant-design/icons";
import { Button, Flex, Space, Table } from "antd";
import type { ColumnsType, TablePaginationConfig, TableProps } from "antd/es/table";
import type { ReactNode } from "react";

export type AdminTableOptions = false | { reload?: () => void };

export type AdminTableProps<T extends object = Record<string, unknown>> = Omit<
  TableProps<T>,
  "columns" | "pagination" | "title"
> & {
  columns: any[];
  headerTitle?: ReactNode;
  toolBarRender?: () => ReactNode[];
  options?: AdminTableOptions;
  search?: false;
  pagination?: TablePaginationConfig | false;
  dateFormatter?: string;
  actionRef?: unknown;
  onSubmit?: (values: Record<string, unknown>) => void;
  toolbarLeading?: ReactNode;
};

function normalizeColumns<T extends object>(columns: any[]): ColumnsType<T> {
  return columns.map((col) => {
    const { renderText, ...rest } = col;
    if (renderText && !rest.render) {
      return {
        ...rest,
        render: (text: unknown, record: T, index: number) =>
          (renderText as (a: unknown, b: T, c: number) => ReactNode)(text, record, index),
      };
    }
    return rest;
  }) as ColumnsType<T>;
}

const cardStyle: React.CSSProperties = {
  minWidth: 0,
  overflow: "hidden",
  borderRadius: 8,
  border: "1px solid var(--ant-color-border-secondary)",
  backgroundColor: "white",
};

const toolbarStyle: React.CSSProperties = {
  borderBottom: "1px solid var(--ant-color-border-secondary)",
  backgroundColor: "var(--ant-color-fill-quaternary)",
  padding: "12px 16px",
};

export function AdminTable<T extends object = Record<string, unknown>>(props: AdminTableProps<T>) {
  const {
    columns,
    headerTitle,
    toolBarRender,
    options,
    search: _s,
    dateFormatter: _d,
    actionRef: _ar,
    onSubmit: _os,
    toolbarLeading,
    pagination,
    bordered: _bordered,
    dataSource,
    className,
    footer,
    ...rest
  } = props;

  const ds = (dataSource ?? []) as T[];
  const normalizedColumns = normalizeColumns<T>(columns);

  const reload = options !== false && options?.reload;
  const toolbarExtras = toolBarRender?.() ?? [];
  const showToolbar =
    headerTitle != null || toolbarLeading != null || Boolean(reload) || toolbarExtras.length > 0;

  const paginationProp: TablePaginationConfig | false | undefined =
    pagination === false ? false : pagination;

  return (
    <Flex vertical gap={0} style={cardStyle}>
      {showToolbar && (
        <Flex justify="space-between" align="center" gap={12} wrap style={toolbarStyle}>
          <Flex gap={12} wrap align="center" flex={1}>
            {headerTitle != null ? (
              <div
                style={{
                  minWidth: 0,
                  flexShrink: 0,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--ant-color-text-heading)",
                }}
              >
                {headerTitle}
              </div>
            ) : null}
            {toolbarLeading != null ? (
              <div
                style={{
                  minWidth: 0,
                  display: "flex",
                  flexWrap: "wrap" as const,
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {toolbarLeading}
              </div>
            ) : null}
          </Flex>
          <Space wrap style={{ flexShrink: 0, justifyContent: "flex-end" }}>
            {reload ? (
              <Button
                type="text"
                size="small"
                icon={<ReloadOutlined />}
                onClick={() => reload()}
                aria-label="刷新"
              />
            ) : null}
            {toolbarExtras}
          </Space>
        </Flex>
      )}
      <div style={{ minWidth: 0, overflow: "auto" }}>
        <Table<T>
          {...rest}
          bordered={false}
          dataSource={ds}
          columns={normalizedColumns}
          pagination={paginationProp}
          footer={footer}
          className={className}
          rootClassName="ant-table-root"
        />
      </div>
    </Flex>
  );
}
