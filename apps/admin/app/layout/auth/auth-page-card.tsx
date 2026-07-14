import { Card, Divider, Flex, Typography } from "antd";
import type { ReactNode } from "react";

type AuthPageCardProps = {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthPageCard({ title, subtitle, children, footer }: AuthPageCardProps) {
  return (
    <Flex vertical align="center" justify="center" style={{ flex: 1, padding: "32px 20px" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: 440,
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        }}
        styles={{ body: { padding: "clamp(24px, 4vw, 36px)" } }}
      >
        <div style={{ marginBottom: 24 }}>
          <Typography.Title level={3} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
          {subtitle ? (
            <Typography.Text style={{ display: "block", marginTop: 6, fontSize: 14 }}>
              {subtitle}
            </Typography.Text>
          ) : null}
        </div>
        <Divider style={{ margin: "0 0 24px" }} />
        {children}
        {footer ? <div style={{ marginTop: 24 }}>{footer}</div> : null}
      </Card>
    </Flex>
  );
}
