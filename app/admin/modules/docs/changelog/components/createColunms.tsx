import { Tag, Space } from "antd";
import { FormatTime } from "~/components/common/format-time";
import { DeleteAction } from "./DeleteAction";
import { typeMap } from "./typeMapSelect";
import { ChangelogUpdateModal } from "./ChangelogUpdateModal";

export const createColunms = ({ t, refetch }: { t: any; refetch: () => void }) => [
  {
    dataIndex: "publish_version",
    title: t("list.publish_version"),
  },
  {
    dataIndex: "publish_name",
    title: t("list.publish_name"),
    tooltip: t("list.publish_name_tooltip"),
  },
  {
    dataIndex: "type",
    title: t("list.type"),
    render: (_: any, record: { type: 1 | 2 | 3 }) => (
      <Tag color={typeMap?.[record.type]?.color}>
        {typeMap?.[record.type]?.text}
      </Tag>
    ),
  },
  {
    dataIndex: "content",
    title: t("list.content"),
    ellipsis: true,
  },
  {
    dataIndex: "url",
    title: t("list.url"),
    ellipsis: true,
    render(_: any, record: any) {
      return <a href={record.url}>{record.url}</a>;
    },
  },
  {
    dataIndex: "publish_time",
    title: t("list.publish_time"),
    render(_: any, record: any) {
      return <FormatTime timeStr={record.publish_time} />;
    },
  },
  {
    dataIndex: "createdAt",
    title: t("list.created_at"),
    render(_: any, record: any) {
      return <FormatTime timeStr={record.createdAt} />;
    },
  },
  {
    dataIndex: "updatedAt",
    title: t("list.updated_at"),
    render(_: any, record: any) {
      return <FormatTime timeStr={record.updatedAt} />;
    },
  },
  {
    dataIndex: "op",
    title: t("list.op"),
    render(_: any, record: any) {
      return (
        <Space>
          <ChangelogUpdateModal
            key="changelog-modal-modify"
            record={record}
            refetch={refetch}
          />
          <DeleteAction record={record} title={""} refetch={refetch} />
        </Space>
      );
    },
  },
];
