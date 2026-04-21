import { SmileOutlined } from "@ant-design/icons";

import { Descriptions } from "antd";
import { FormatTime } from "~/components/common";

export function LoginIn({ data, userInfo }: any) {
  const latestLoginLog = data?.latestLoginLog ?? {};
  const displayName = userInfo?.name || userInfo?.email || "—";
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", fontSize: 20, paddingBottom: 10 }}>
        <SmileOutlined style={{ marginRight: 10 }} />
        欢迎，<span style={{ color: "#84cc16" }}>{displayName}</span>
      </div>
      <Descriptions column={3} size="small">
        <Descriptions.Item label="所属部门">{userInfo?.department?.name}</Descriptions.Item>
        <Descriptions.Item label="最近登录时间">
          <FormatTime timeStr={latestLoginLog?.loginAt} />
        </Descriptions.Item>
        <Descriptions.Item label="最近登录ip">{latestLoginLog.ip}</Descriptions.Item>
        <Descriptions.Item label="最近登录系统">{latestLoginLog.system}</Descriptions.Item>
        <Descriptions.Item label="最近登录设备">{latestLoginLog.browser}</Descriptions.Item>
        <Descriptions.Item label="最近登录地址">{latestLoginLog.address}</Descriptions.Item>
      </Descriptions>
    </div>
  );
}
