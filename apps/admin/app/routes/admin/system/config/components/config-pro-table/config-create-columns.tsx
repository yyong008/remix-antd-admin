import { FormatTime, StatusType } from "~/components/common";
import { Flex, Space } from "antd";

import { DeleteAction } from "../DeleteAction";
import { UpdateConfigModal } from "../UpdateConfigModal";

export const createConfigTableColumns = ({ refetch }: any) => [
  {
    dataIndex: "name",
    title: "参数名称",
    render(_: any, record: any) {
      return (
        <Flex align="center" gap={16} style={{ fontWeight: 700 }}>
          <span>{record.name}</span>
        </Flex>
      );
    },
  },
  {
    dataIndex: "key",
    title: "参数键名",
  },
  {
    dataIndex: "value",
    title: "参数键值",
  },
  {
    dataIndex: "type",
    title: "参数类型",
  },
  {
    dataIndex: "description",
    title: "描述",
  },
  {
    dataIndex: "remark",
    title: "备注",
  },
  {
    dataIndex: "status",
    title: "状态",
    renderText(_: any, record: any) {
      return <StatusType status={record.status} />;
    },
  },
  {
    dataIndex: "createdAt",
    title: "创建时间",
    render(_: any, record: any) {
      return <FormatTime timeStr={record.createdAt} />;
    },
  },
  {
    dataIndex: "updatedAt",
    title: "更新时间",
    render(_: any, record: any) {
      return <FormatTime timeStr={record.updatedAt} />;
    },
  },
  {
    dataIndex: "op",
    title: "操作",
    render(_: any, record: any) {
      return (
        <Space size="small">
          <UpdateConfigModal record={record} refetch={refetch} key="update-config-modal" />
          <DeleteAction title="确定要删除配置？" refetch={refetch} record={record} />
        </Space>
      );
    },
  },
];
