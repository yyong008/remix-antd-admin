import { isRouteErrorResponse, useRouteError } from "react-router";
import { Button, Card, Result, Typography, Space, theme } from "antd";
import { FallOutlined, ReloadOutlined, HomeOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;

type ResultStatusType = Parameters<typeof Result>[0]["status"];

function ErrorCard({
  title,
  subTitle,
  status,
  children,
}: {
  title: string;
  subTitle?: string;
  status?: ResultStatusType;
  children?: React.ReactNode;
}) {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${token.colorBgLayout} 0%, ${token.colorBgContainer} 100%)`,
        padding: token.paddingLG,
      }}
    >
      <Card
        style={{
          maxWidth: 520,
          width: "100%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          borderRadius: token.borderRadiusLG,
        }}
        styles={{ body: { padding: token.paddingLG * 2 } }}
      >
        <Result
          status={status}
          icon={<FallOutlined style={{ fontSize: 64 }} />}
          title={
            <Text strong style={{ fontSize: 24 }}>
              {title}
            </Text>
          }
          subTitle={
            subTitle ? (
              <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                {subTitle}
              </Paragraph>
            ) : undefined
          }
          extra={
            children ? (
              <Space direction="vertical" style={{ width: "100%" }}>
                {children}
              </Space>
            ) : undefined
          }
        />
      </Card>
    </div>
  );
}

function ErrorDetailsCard({ error }: { error: Error }) {
  const { token } = theme.useToken();
  return (
    <Card
      size="small"
      style={{
        background: "rgba(255,0,0,0.04)",
        border: `1px solid ${token.colorErrorBorder}`,
        borderRadius: token.borderRadius,
      }}
    >
      <Paragraph
        style={{
          margin: 0,
          fontFamily: "monospace",
          fontSize: 12,
          wordBreak: "break-all",
        }}
        copyable={{ text: error.message }}
      >
        <Text type="danger" style={{ fontSize: 12 }}>
          {error.message}
        </Text>
      </Paragraph>
    </Card>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    const statusMap: Record<number, { title: string; subTitle: string; status: ResultStatusType }> =
      {
        400: {
          title: "请求参数错误",
          subTitle: "您输入的数据可能格式不正确，请检查后重试。",
          status: "warning",
        },
        401: { title: "未授权访问", subTitle: "您需要登录才能访问此页面。", status: "error" },
        403: { title: "权限不足", subTitle: "您没有足够的权限访问此资源。", status: "error" },
        404: {
          title: "页面不存在",
          subTitle: "抱歉，您访问的页面不存在或已被移除。",
          status: "warning",
        },
        408: { title: "请求超时", subTitle: "服务器响应时间过长，请稍后重试。", status: "warning" },
        500: {
          title: "服务器错误",
          subTitle: "服务器遇到了一个错误，请稍后再试。",
          status: "error",
        },
        502: {
          title: "网关错误",
          subTitle: "服务器作为网关或代理，从上游服务器收到了无效响应。",
          status: "error",
        },
        503: { title: "服务不可用", subTitle: "服务暂时不可用，请稍后再试。", status: "error" },
      };

    const config = statusMap[error.status] ?? {
      title: `${error.status} ${error.statusText}`,
      subTitle: error.data || "发生了未知错误。",
      status: "error" as ResultStatusType,
    };

    return (
      <ErrorCard {...config}>
        <Button type="primary" icon={<HomeOutlined />} onClick={() => (window.location.href = "/")}>
          返回首页
        </Button>
        <Button icon={<ReloadOutlined />} onClick={() => location.reload()}>
          刷新页面
        </Button>
      </ErrorCard>
    );
  }

  if (error instanceof Error) {
    const isDev = import.meta.env.DEV;

    return (
      <ErrorCard
        title="应用程序错误"
        subTitle="抱歉，应用程序遇到了一些问题，请稍后再试。"
        status="error"
      >
        {isDev && <ErrorDetailsCard error={error} />}
        <Space>
          <Button
            type="primary"
            icon={<HomeOutlined />}
            onClick={() => (window.location.href = "/")}
          >
            返回首页
          </Button>
          <Button icon={<ReloadOutlined />} onClick={() => location.reload()}>
            刷新页面
          </Button>
        </Space>
      </ErrorCard>
    );
  }

  return (
    <ErrorCard title="未知错误" subTitle="发生了一个未知的错误，请刷新页面重试。" status="error">
      <Space>
        <Button type="primary" icon={<HomeOutlined />} onClick={() => (window.location.href = "/")}>
          返回首页
        </Button>
        <Button icon={<ReloadOutlined />} onClick={() => location.reload()}>
          刷新页面
        </Button>
      </Space>
    </ErrorCard>
  );
}
