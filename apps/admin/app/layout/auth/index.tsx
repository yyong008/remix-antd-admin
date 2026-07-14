import { Flex } from "antd";
import { Outlet } from "react-router";
import { AuthTopBar } from "./auth-top-bar";

export default function AuthLayout() {
  return (
    <Flex
      vertical
      style={{
        minHeight: "100dvh",
      }}
    >
      <AuthTopBar />
      <Flex vertical style={{ minHeight: 0, flex: 1 }}>
        <Outlet />
      </Flex>
    </Flex>
  );
}
