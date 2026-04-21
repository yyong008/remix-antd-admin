import type { ReactNode } from "react";
import { Flex } from "antd";

export function Layout({ children }: { children?: ReactNode }) {
  return (
    <Flex
      vertical
      style={{
        paddingTop: 140,
        width: "40vw",
        height: "80vh",
      }}
    >
      {children}
    </Flex>
  );
}
