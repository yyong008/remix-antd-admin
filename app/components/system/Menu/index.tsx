// type
// import type { ProColumns } from "@ant-design/pro-components";

// remix
// import { useFetcher } from "@remix-run/react";

// component
import { ProTable } from "@ant-design/pro-components";
import { Space, Tag, Tooltip } from "antd";
import MenuModal from "./CreateMenuModel";
import AntdIcon from "~/components/common/AntdIcon";
import MenuType from "~/components/common/MenuType";
import StatusType from "~/components/common/StatusType";
import ShowType from "~/components/common/ShowType";
import LinkType from "~/components/common/LinkType";
import FormatTime from "~/components/common/FormatTime";
import DeleteIt from "~/components/common/DeleteIt";
import CacheType from "~/components/common/CacheType";

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
  fetcher: () => void;
};

export default function SystemMenu(props: SystemMenuProps) {
  const { menuRaw = [], menuNotPerm = [], fetcher } = props;
  return (
    <ProTable<TableListItem>
      size="small"
      columns={[
        {
          key: "name",
          title: "名称",
          dataIndex: "name",
          ellipsis: true,
          width: 200,
          render(_, record: any) {
            return (
              <Tooltip title={record?.description}>{record?.name}</Tooltip>
            );
          },
        },
        {
          key: "icon",
          title: "图标",
          dataIndex: "icon",
          align: "center",
          width: 80,
          render: (_, record) => {
            return <AntdIcon name={record?.icon} className="text-[20px]" />;
          },
        },
        {
          title: "类型",
          dataIndex: "type",
          ellipsis: true,
          width: 80,
          render(_, record: any) {
            return (
              <Tooltip title={record?.description}>
                <MenuType type={record?.type} />
              </Tooltip>
            );
          },
        },
        {
          title: "路由路径",
          dataIndex: "path",
          tooltip: "当前路由路径",
          ellipsis: true,
          width: 200,
          render: (_, record) => {
            if (record.isLink) {
              return (
                <a href={record.path} target="_blank" rel="noreferrer">
                  {record.path}
                </a>
              );
            }
            return <>{record?.path}</>;
          },
        },
        {
          title: "路由文件",
          dataIndex: "path_file",
          tooltip: "指定路由文件",
          ellipsis: true,
          width: 200,
          render: (_, record: any) => <div>{record?.path_file}</div>,
        },
        {
          title: "权限标识",
          dataIndex: "permission",
          tooltip: "权限名称",
          width: 200,
          render: (_, record: any) =>
            record?.permission ? (
              <Tag color="pink">{record?.permission}</Tag>
            ) : (
              ""
            ),
        },
        {
          title: "排序",
          dataIndex: "orderNo",
          align: "center",
          tooltip: "排序数字",
          width: 100,
          render: (_, record) => <div>{record?.orderNo}</div>,
        },
        {
          dataIndex: "status",
          title: "状态",
          tooltip: "是否被禁用",
          width: 80,
          render(_: any, record: any) {
            return <StatusType status={record?.status} />;
          },
        },
        {
          dataIndex: "isShow",
          title: "显示",
          width: 80,
          tooltip: "是否在菜单中显示?",
          render(_: any, record: any) {
            return <ShowType isShow={record?.isShow} />;
          },
        },
        {
          dataIndex: "isLink",
          title: "外链",
          tooltip: "是否外链?",
          width: 80,
          render(_: any, record: any) {
            return <LinkType isLink={record?.isLink} />;
          },
        },
        {
          dataIndex: "isCache",
          title: "缓存",
          tooltip: "是否缓存?",
          width: 80,
          render(_: any, record: any) {
            return <CacheType isCache={record?.isCache} />;
          },
        },
        {
          title: "创建时间",
          dataIndex: "createdAt",
          ellipsis: true,
          align: "center",
          width: 200,
          render: (_, record) => <FormatTime timeStr={record.createdAt} />,
        },
        {
          title: "更新时间",
          dataIndex: "updatedAt",
          ellipsis: true,
          align: "center",
          width: 200,
          render: (_, record) => <FormatTime timeStr={record.updatedAt} />,
        },
        {
          title: "操作",
          dataIndex: "op",
          fixed: "right",
          width: 150,
          render: (_, record) => (
            <Space>
              <MenuModal
                key="memu-modal"
                fetcher={fetcher}
                record={record}
                menuNotPerm={menuNotPerm}
              />
              <DeleteIt
                title="确定要删除此用户吗?"
                fetcher={fetcher}
                record={record}
              />
            </Space>
          ),
        },
      ]}
      scroll={{ x: 1300 }}
      dataSource={menuRaw}
      rowKey="id"
      pagination={false}
      search={false}
      dateFormatter="string"
      headerTitle="菜单管理"
      rowClassName={(record) => {
        return record.parentId ? "bg-yellow-50" : "";
      }}
      toolBarRender={() => [
        <MenuModal
          key="menu-modal"
          fetcher={fetcher}
          menuNotPerm={menuNotPerm}
          record={{}}
        />,
      ]}
    />
  );
}
