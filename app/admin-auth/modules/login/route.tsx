import { App, ConfigProvider } from "antd";
import { Left } from "./components/Left";
import { ProConfigProvider } from "@ant-design/pro-components";
import { Right } from "./components/Right";
import { SettingContext } from "@/context/setting-context";
import { useContext } from "react";
import { useNProgress } from "@/hooks/useNprogress";
import { useAntdLocal } from "~/hooks/useAntdLocal";

export function Route() {
  useNProgress();
  const value = useContext(SettingContext);
  const locale = useAntdLocal();

  return (
    <App>
      <ProConfigProvider>
        <ConfigProvider
          theme={{
            token: value.theme,
          }}
          locale={locale}
        >
          <div className="flex flex-1 flex-grow w-[100vw] h-[100vh]">
            <Left />
            <Right />
          </div>
        </ConfigProvider>
      </ProConfigProvider>
    </App>
  );
}
