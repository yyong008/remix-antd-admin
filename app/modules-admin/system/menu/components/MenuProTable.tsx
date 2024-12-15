import { CreateMenuModal } from "./CreateMenuModal";
import { ExpandIcon } from "@/components/common/ExpandIcon";
import { ProTable } from "@ant-design/pro-components";
import { ProTableFooter } from "./ProTableFooter";
import { ProTableHeaderTitle } from "./ProTableHeaderTitle";
import { createColumns } from "./create-columns";

export type Status = {
  color: string;
  text: string;
};

export type TableListItem = {
  id: number;
  parentId: number;
  key: number;
  name: string;
  icon: string;
  containers: number;
  orderNo: number;
  path: string;
  creator: string;
  status: Status;
  createdAt: number;
  updatedAt: number;
  isLink: 0 | 1;
};

type SystemMenuProps = {
  // menu: any[];
  // roles: any[];
  menuRaw: any[];
  menuNotPerm: any[];
  loading: boolean;
  reload: any;
  total: number;
};

export function MenuProTable(props: SystemMenuProps) {
  const { menuRaw = [], menuNotPerm = [], reload, total } = props;
  return (
    <ProTable<TableListItem>
      size="small"
      bordered
      columns={createColumns({ refetch: reload, menuNotPerm }) as any}
      scroll={{ x: 1300 }}
      dataSource={menuRaw}
      rowKey="id"
      pagination={false}
      search={false}
      dateFormatter="string"
      loading={props.loading}
      headerTitle={<ProTableHeaderTitle title="菜单管理" />}
      options={{
        reload: props.reload,
      }}
      rowClassName={(record) => {
        return record.parentId ? "bg-yellow-50" : "";
      }}
      toolBarRender={() => [
        <CreateMenuModal key="create-menu-modal" menuNotPerm={menuNotPerm} />,
      ]}
      expandable={{
        expandIcon: ExpandIcon,
      }}
      footer={() => <ProTableFooter total={total} />}
    />
  );
}
