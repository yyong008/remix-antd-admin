import {
  AntdIcon,
  CacheType,
  FormatTime,
  LinkType,
  MenuType,
  ShowType,
  StatusType,
} from "@/components/common";
import { Space, Tag, Tooltip } from "antd";

import { DeleteAction } from "./DeleteAction";
import UpdateMenuModal from "./UpdateMenuModal";

export const createColumns = ({ refetch, menuNotPerm }: any) => [
  {
    key: "name",
    title: "名称",
    dataIndex: "name",
    ellipsis: true,
    width: 200,
    render(_: any, record: any) {
      return (
        <Tooltip title={record?.description}>
          <span className="font-bold">{record?.name}</span>
        </Tooltip>
      );
    },
  },
  {
    key: "icon",
    title: "图标",
    dataIndex: "icon",
    align: "center",
    width: 80,
    render: (_: any, record: any) => {
      return <AntdIcon name={record?.icon} className="text-[20px]" />;
    },
  },
  {
    title: "类型",
    dataIndex: "type",
    ellipsis: true,
    width: 80,
    render(_: any, record: any) {
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
    render: (_: any, record: any) => {
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
    render: (_: any, record: any) => <div>{record?.path_file}</div>,
  },
  {
    title: "权限标识",
    dataIndex: "permission",
    tooltip: "权限名称",
    width: 200,
    render: (_: any, record: any) =>
      record?.permission ? <Tag color="pink">{record?.permission}</Tag> : "",
  },
  {
    title: "排序",
    dataIndex: "orderNo",
    align: "center",
    tooltip: "排序数字",
    width: 100,
    render: (_: any, record: any) => <div>{record?.orderNo}</div>,
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
    render: (_: any, record: any) => <FormatTime timeStr={record.createdAt} />,
  },
  {
    title: "更新时间",
    dataIndex: "updatedAt",
    ellipsis: true,
    align: "center",
    width: 200,
    render: (_: any, record: any) => <FormatTime timeStr={record.updatedAt} />,
  },
  {
    title: "操作",
    dataIndex: "op",
    fixed: "right",
    width: 150,
    render: (_: any, record: any) => (
      <Space>
        <UpdateMenuModal
          key="update-memu-modal"
          record={record}
          refetch={refetch}
          menuNotPerm={menuNotPerm}
        />
        <DeleteAction
          title="确定要删除此用户吗?"
          record={record}
          refetch={refetch}
        />
      </Space>
    ),
  },
];
