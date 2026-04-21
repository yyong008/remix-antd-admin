import { Descriptions, Spin, Tag } from "antd";
import dayjs from "dayjs";

import type { AdminSysUserInfo } from "~/api-client/queries/system-user";

function fmt(value: string | null | undefined) {
  if (value == null) return "—";
  const s = String(value).trim();
  return s !== "" ? s : "—";
}

function formatDateTime(value: string | undefined) {
  if (!value) return "—";
  const d = dayjs(value);
  return d.isValid() ? d.format("YYYY-MM-DD HH:mm:ss") : "—";
}

function statusTag(status: number | undefined) {
  if (status === 1) return <Tag color="success">正常</Tag>;
  if (status === 0) return <Tag>停用</Tag>;
  return <Tag>—</Tag>;
}

export function BasicInfoDescriptions(props: {
  userInfo: AdminSysUserInfo | null | undefined;
  loading?: boolean;
}) {
  const { userInfo, loading } = props;

  if (loading && !userInfo) {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 32, paddingBottom: 32 }}>
        <Spin />
      </div>
    );
  }

  const u = userInfo;

  return (
    <Descriptions
      bordered
      size="middle"
      column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
      styles={{
        label: {
          width: 112,
          whiteSpace: "nowrap",
          verticalAlign: "top",
        },
        content: { wordBreak: "break-word" },
      }}
    >
      <Descriptions.Item label="用户名">{fmt(u?.name)}</Descriptions.Item>
      <Descriptions.Item label="昵称">{fmt(u?.nickname)}</Descriptions.Item>
      <Descriptions.Item label="邮箱">{fmt(u?.email)}</Descriptions.Item>
      <Descriptions.Item label="手机号">{fmt(u?.phone)}</Descriptions.Item>
      <Descriptions.Item label="部门">{fmt(u?.department?.name)}</Descriptions.Item>
      <Descriptions.Item label="状态">{statusTag(u?.status)}</Descriptions.Item>
      <Descriptions.Item label="语言">{fmt(u?.locale)}</Descriptions.Item>
      <Descriptions.Item label="主题">{fmt(u?.theme)}</Descriptions.Item>
      <Descriptions.Item label="备注" span={2}>
        {fmt(u?.remark)}
      </Descriptions.Item>
      <Descriptions.Item label="创建时间">{formatDateTime(u?.createdAt)}</Descriptions.Item>
      <Descriptions.Item label="更新时间">{formatDateTime(u?.updatedAt)}</Descriptions.Item>
    </Descriptions>
  );
}
