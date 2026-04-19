import { SettingDrawer } from "@ant-design/pro-components";

export const SettingDrawerWrap = ({ theme, setTheme }: any) => {
  return (
    <SettingDrawer
      getContainer={() => document.body}
      enableDarkTheme
      onSettingChange={(settings: any) => {
        setTheme(settings);
      }}
      settings={{ ...theme }}
    />
  );
};
