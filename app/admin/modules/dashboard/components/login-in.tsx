import { SmileOutlined } from "@ant-design/icons";

import { Descriptions } from "antd";
import { useTranslation } from "react-i18next";
import { FormatTime } from "~/components/common";

export function LoginIn({ data, userInfo }: any) {
  const { t } = useTranslation("dashboard");
  const latestLoginLog = data?.latestLoginLog ?? {};
  return (
    <div>
      <div className="flex items-center text-[20px] pb-[10px]">
        <SmileOutlined className="mr-[10px]" />
        {t("welcome")}，<span className="text-lime-500">{userInfo?.name}</span>
      </div>
      <Descriptions column={3} size="small">
        <Descriptions.Item label={t("loginIn.department")}>
          {userInfo?.department?.name}
        </Descriptions.Item>
        <Descriptions.Item label={t("loginIn.latestLoginTime")}>
          <FormatTime timeStr={latestLoginLog?.loginAt} />
        </Descriptions.Item>
        <Descriptions.Item label={t("loginIn.latestLoginIp")}>
          {latestLoginLog.ip}
        </Descriptions.Item>
        <Descriptions.Item label={t("loginIn.latestLoginSystem")}>
          {latestLoginLog.system}
        </Descriptions.Item>
        <Descriptions.Item label={t("loginIn.latestLoginBrowser")}>
          {latestLoginLog.browser}
        </Descriptions.Item>
        <Descriptions.Item label={t("loginIn.latestLoginAddress")}>
          {latestLoginLog.address}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
