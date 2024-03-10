// types
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Tabs } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import {
  BasicSetting,
  SecretSetting,
  CountBindSetting,
  NewSetting,
} from "~/components/accountSettings";

// styles
import "react-advanced-cropper/dist/style.css";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "account-settings",
    },
  ];
};

// remix:loader
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return json({
    data: (await import("~/data/accountSettings")).default,
    provinces: [],
    cities: [],
  });
};

export default function Settings() {
  const { data, provinces, cities } = useLoaderData<typeof loader>();
  const items = [
    {
      label: `基本设置`,
      key: "BasicSetting",
      children: <BasicSetting provinces={provinces} cities={cities} />,
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
