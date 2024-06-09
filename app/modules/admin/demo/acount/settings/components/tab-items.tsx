import { BasicSetting } from "./basic-setting";
import { CountBindSetting } from "./count-bind-setting";
import { NewSetting } from "./new-setting";
import { SecretSetting } from "./secre-setting";

export const items = (provinces: any, data: any, cities: any) => [
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
