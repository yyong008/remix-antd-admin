import { Button, Space } from "antd";

import { CreateDeptModal } from "../create-dept-modal";
import { DeleteIt } from "@/components/common";
import { EditOutlined } from "@ant-design/icons";
import { formatDate } from "@/utils/client";

export const createColumns = () => [
  {
    dataIndex: "name",
    title: "用户名",
  },
  {
    dataIndex: "description",
    title: "描述",
  },
  {
    dataIndex: "parent_department_id",
    title: "父 ID",
  },
  {
    dataIndex: "sorter",
    title: "序号",
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
          <CreateDeptModal
            record={record}
            key="dept-modal"
            trigger={<Button type="link" icon={<EditOutlined />} />}
          />
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
