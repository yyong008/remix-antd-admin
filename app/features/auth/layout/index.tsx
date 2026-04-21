import { ConfigProvider, Flex } from "antd";
import { useContext } from "react";
import { Outlet } from "react-router";
import { AuthTopBar } from "../components/AuthTopBar";
import { SettingContext } from "@/context/setting-context";

export default function AuthLayout() {
  const value = useContext(SettingContext);

  return (
    <ConfigProvider
      theme={{
        token: value.theme,
      }}
    >
      <Flex
        vertical
        style={{
          minHeight: "100dvh",
          background: "var(--mkt-bg)",
          color: "var(--mkt-text)",
        }}
      >
        <AuthTopBar />
        <Flex vertical style={{ minHeight: 0, flex: 1 }}>
          <Outlet />
        </Flex>
      </Flex>
    </ConfigProvider>
  );
}
