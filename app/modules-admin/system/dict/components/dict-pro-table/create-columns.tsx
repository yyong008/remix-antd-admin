import { Button, Space, Tag, Tooltip } from "antd";
import { DeleteIt, FormatTime, StatusType } from "~/components/common";

import { DictModal } from "../dict/create-dict-modal";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "@remix-run/react";

export const createColumns = ({ lang }: any) => [
  {
    dataIndex: "name",
    title: "字典名",
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
          <Tooltip title="预览字典">
            <Link to={`/${lang}/admin/system/dict-item/${record.id}`}>
              <Button type="link" icon={<EyeOutlined />}></Button>
            </Link>
          </Tooltip>
          <DictModal record={record} key="create-dict-modal" />
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

function TagLink({ lang, record }: any) {
  return (
    <Link to={`/${lang}/admin/system/dict-item/${record.id}`}>
      <Tag color="yellow">{record.code}</Tag>
    </Link>
  );
}
