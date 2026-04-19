import { type ProColumns, ProTable } from "@ant-design/pro-components";
import { type SizeType } from "antd/es/config-provider/SizeContext";

type PTable = {
  rowKey?: string;
  size?: SizeType;
  headerTitle: string;
  dataSource: any[];
  data?: any[];
  loading?: boolean;
  search?: false | undefined;
  reload?: () => any;
  toolBarRender?: () => any[];
  total?: number;
  pageSize?: number;
  onPaginationChange?: (page: number, pageSize: number) => any;
  columns: ProColumns<any, "text">[] | undefined;
};

export function PTable(props: PTable) {
  return (
    <ProTable
      rowKey={props.rowKey || "id"}
      size={props.size || "small"}
      headerTitle={props.headerTitle}
      search={props.search || false}
      loading={props?.loading || false}
      options={{
        reload: props?.reload,
      }}
      toolBarRender={props?.toolBarRender}
      dataSource={props.dataSource || []}
      columns={props?.columns || []}
      pagination={{
        total: props.total || 0,
        pageSize: props.pageSize || 10,
        onChange(_page, pageSize) {
          props?.onPaginationChange?.(_page, pageSize);
        },
      }}
    />
  );
}
