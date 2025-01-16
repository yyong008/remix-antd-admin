import { FormatTime, StatusType } from "@/components/common";
import { Space, Tag } from "antd";

import { DeleteAction } from "./DeleteAction";
import { Link } from "react-router";
import { ProfileOutlined } from "@ant-design/icons";
import { UpdateDictModal } from "./UpdateDictModal";

export const createColumns = ({ lang, refetch }: any) => [
  {
    dataIndex: "name",
    title: "字典名",
    render(_: any, record: any) {
      return (
        <div className="flex font-bold gap-4">
          <ProfileOutlined />
          <span>{record.name}</span>
        </div>
      );
    },
  },
  {
    dataIndex: "code",
    title: "字典值(编码)",
    render(_: any, record: any) {
      return <TagLink lang={lang} record={record} />;
    },
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
          <UpdateDictModal
            record={record}
            refetch={refetch}
            key="update-dict-modal"
          />
          <DeleteAction
            title="确定要删除字典？"
            refetch={refetch}
            record={record}
          />
        </Space>
      );
    },
  },
];

function TagLink({ lang, record }: any) {
  return (
    <Link to={`/${lang}/admin/system/dict-item/${record.id}`}>
      <Tag color="blue">{record.code}</Tag>
    </Link>
  );
}
