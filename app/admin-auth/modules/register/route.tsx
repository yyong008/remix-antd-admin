import { App, ConfigProvider } from "antd";
import { Left } from "./components/Left";
import { ProConfigProvider } from "@ant-design/pro-components";
import { Right } from "./components/Right";
import { SettingContext } from "@/context/setting-context";
import { useContext } from "react";
import { useNProgress } from "@/hooks/useNprogress";

export function Route() {
  useNProgress();
  const value = useContext(SettingContext);

  return (
    <App>
      <ProConfigProvider>
        <ConfigProvider
          theme={{
            token: value.theme,
          }}
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
