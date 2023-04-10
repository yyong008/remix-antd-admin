// types
import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";

// cores
import React from "react";

// components:vendor
import { Tabs } from "antd";
import { ProCard } from "@ant-design/pro-components";

// components
import {
  BasicSetting,
  SecretSetting,
  CountBindSetting,
  NewSetting,
} from "~/components/accountSettings";

// hooks
import { useLoaderData } from "@remix-run/react";

// data
import data from "~/data/accountSettings";

// css
import CropperStyles from "react-advanced-cropper/dist/style.css";

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: CropperStyles,
    },
  ];
};

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "账户设置",
    },
  ];
};

export const loader: LoaderFunction = () => {
  return data;
};

const Settings: React.FC = () => {
  const data = useLoaderData();
  const items = [
    {
      label: `基本设置`,
      key: "BasicSetting",
      children: <BasicSetting />,
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
    <ProCard>
      <Tabs tabPosition={"left"} items={items} />
    </ProCard>
  );
};

export default Settings;
