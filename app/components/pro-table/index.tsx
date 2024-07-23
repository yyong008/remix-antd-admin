import { ProTable } from "@ant-design/pro-components";

type PTable = {
  rowKey: string;
  size: string;
  headerTitle: string;
  dataSource: any[];
  data: any[];
  loading: boolean;
  search: boolean;
  reload: () => any;
  toolBarRender: () => any[];
  total: number;
  pageSize: number;
  onPaginationChange: (page: number, pageSize: number) => any;
};

export function PTable(props: any) {
  return (
    <ProTable
      rowKey={props.rowKey || "id"}
      size={props.size || "small"}
      headerTitle={props.headerTitle}
      search={props.search}
      loading={props.loading}
      options={{
        reload: props.reload,
      }}
      toolBarRender={props.toolBarRender}
      dataSource={props.dataSource}
      columns={props.columns}
      pagination={{
        total: props.total,
        pageSize: 10,
        onChange(_page, pageSize) {
          props.onPaginationChange(_page, pageSize);
        },
      }}
    />
  );
}
