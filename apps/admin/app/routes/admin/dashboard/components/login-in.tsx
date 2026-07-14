import { SmileOutlined } from "@ant-design/icons";

import { Descriptions } from "antd";
import { FormatTime, MarkupText } from "~/components/common";
import { m } from "~/paraglide/messages";

export function LoginIn({ data, userInfo }: any) {
  const latestLoginLog = data?.latestLoginLog ?? {};
  const displayName = userInfo?.name || userInfo?.email || "—";
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", fontSize: 20, paddingBottom: 10 }}>
        <SmileOutlined style={{ marginRight: 10 }} />
        <MarkupText
          parts={m.dashboard_greeting.parts({ name: displayName })}
          renderers={{
            name: ({ children }) => <span style={{ color: "#84cc16" }}>{children}</span>,
          }}
        />
      </div>
      <Descriptions column={3} size="small">
        <Descriptions.Item label={m.dashboard_department()}>
          {userInfo?.department?.name}
        </Descriptions.Item>
        <Descriptions.Item label={m.dashboard_login_time()}>
          <FormatTime timeStr={latestLoginLog?.loginAt} />
        </Descriptions.Item>
        <Descriptions.Item label={m.dashboard_login_ip()}>{latestLoginLog.ip}</Descriptions.Item>
        <Descriptions.Item label={m.dashboard_login_system()}>
          {latestLoginLog.system}
        </Descriptions.Item>
        <Descriptions.Item label={m.dashboard_login_device()}>
          {latestLoginLog.browser}
        </Descriptions.Item>
        <Descriptions.Item label={m.dashboard_login_address()}>
          {latestLoginLog.address}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
