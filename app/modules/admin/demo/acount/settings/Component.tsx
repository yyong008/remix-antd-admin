import "react-advanced-cropper/dist/style.css";

import {
  BasicSetting,
  CountBindSetting,
  NewSetting,
  SecretSetting,
} from "~/components/account/accountSettings";
import { PageContainer, ProCard } from "@ant-design/pro-components";

import { Tabs } from "antd";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Component() {
  const { data, provinces, cities }: any = useLoaderData<typeof loader>();
  const items = [
    {
      label: `基本设置`,
      key: "BasicSetting",
      children: <BasicSetting provinces={provinces ?? []} cities={cities} />,
    },
    {
      label: `安全设置`,
      key: "SecretSetting",
      children: <SecretSetting dataSource={data.secretSettingsData} />,
    },
    {
      label: `账号绑定`,
      key: "CountBindSetting",
      children: <CountBindSetting dataSource={data.countBindSettingsData} />,
    },
    {
      label: `账户密码`,
      key: "NewSetting",
      children: <NewSetting dataSource={data.newSettingData} />,
    },
  ];
  return (
    <PageContainer
      title={null}
      style={{
        background: "transparent",
      }}
    >
      <ProCard>
        <Tabs tabPosition={"left"} items={items} />
      </ProCard>
    </PageContainer>
  );
}
