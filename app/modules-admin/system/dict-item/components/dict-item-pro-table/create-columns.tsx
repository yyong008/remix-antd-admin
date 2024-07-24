import { DeleteIt, StatusType } from "~/components/common";

import { DictItemModal } from "~/modules-admin/system/dict/components/dict/create-dict-item-modal";
import { Space } from "antd";
import { formatDate } from "@/utils/client";

export const createColumns = () => [
  {
    dataIndex: "key",
    title: "字典键",
  },
  {
    dataIndex: "value",
    title: "字典值",
  },
  {
    dataIndex: "description",
    title: "描述",
  },
  {
    dataIndex: "remark",
    title: "标记",
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
      return <div>{record.createdAt ? formatDate(record.createdAt) : "-"}</div>;
    },
  },
  {
    dataIndex: "updatedAt",
    title: "更新时间",
    render(_: any, record: any) {
      return <div>{record.updatedAt ? formatDate(record.updatedAt) : "-"}</div>;
    },
  },
  {
    dataIndex: "op",
    title: "操作",
    render(_: any, record: any) {
      return (
        <Space>
          <DictItemModal key="create-dict-modal" record={record} />
          <DeleteIt
            title="确定要删除此部门吗?"
            fetcher={() => {}}
            record={record}
          />
        </Space>
      );
    },
  },
];
