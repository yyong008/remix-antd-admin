// types
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

// cores
import React from "react";

// components:vendor
import { Tabs } from "antd";
import { json } from "@remix-run/node";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// components
import {
  BasicSetting,
  SecretSetting,
  CountBindSetting,
  NewSetting,
} from "~/components/accountSettings";

// hooks
import { useLoaderData } from "@remix-run/react";

// css
import CropperStyles from "react-advanced-cropper/dist/style.css";

// utils

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: CropperStyles,
    },
  ];
};

export const meta: MetaFunction = () => {
  return [
    {
      title: "账户设置",
    },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return json({
    data: (await import("~/data/accountSettings")).default,
    // provinces: await import("china-division/dist/provinces.json", { assert: { type: 'json' } }),
    // cities: await import("china-division/dist/cities.json", { assert: { type: 'json' } }),
    provinces: [],
    cities: [],
  });
};

const Settings: React.FC = () => {
  const { data, provinces, cities }: any = useLoaderData();
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
};

export default Settings;
