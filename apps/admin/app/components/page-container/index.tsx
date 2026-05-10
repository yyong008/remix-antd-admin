import { Grid, Spin, Typography } from "antd";
import type { CSSProperties, ReactNode } from "react";

export type PageContainerProps = {
  children: ReactNode;
  title?: ReactNode;
  subTitle?: ReactNode;
  loading?: boolean;
  ghost?: boolean;
  headerSpacing?: "default" | "compact";
  className?: string;
  style?: CSSProperties;
};

export function PageContainer({
  children,
  title,
  subTitle,
  loading,
  ghost,
  headerSpacing = "default",
  className,
  style,
}: PageContainerProps) {
  const screens = Grid.useBreakpoint();
  const md = !!screens.md;

  const outerStyle: CSSProperties = {
    width: "100%",
    minWidth: 0,
    ...(ghost
      ? { padding: md ? "12px 20px" : "12px 16px" }
      : { padding: md ? "20px 24px" : "16px 20px" }),
    ...style,
  };

  const showHeader = title != null || subTitle != null;
  const headerMarginBottom = headerSpacing === "compact" ? 8 : 16;

  const main = (
    <>
      {showHeader ? (
        <div style={{ marginBottom: headerMarginBottom }}>
          {title != null ? (
            <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>
              {title}
            </Typography.Title>
          ) : null}
          {subTitle != null ? (
            <Typography.Text type="secondary" style={{ display: "block", fontSize: 14 }}>
              {subTitle}
            </Typography.Text>
          ) : null}
        </div>
      ) : null}
      {children}
    </>
  );

  return (
    <div className={className} style={outerStyle}>
      {loading ? (
        <Spin spinning style={{ display: "block", minHeight: 120, width: "100%" }}>
          {main}
        </Spin>
      ) : (
        main
      )}
    </div>
  );
}
