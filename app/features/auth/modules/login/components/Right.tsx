import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { ProForm, ProFormText } from "~/components/pro-form-kit";
import { Card, Divider, Flex, Form, Grid, Typography, message } from "antd";
import { useState } from "react";
import { href, Link, useNavigate, useParams } from "react-router";
import { useLogin } from "~/api-client/queries/auth";
import { TurnstileWidget } from "~/components/captcha";
import { isTurnstileEnabled } from "~/config/turnstile";
import { AUTH_PRODUCT_NAME } from "~/features/auth/components/AuthMarketingShell";
import { useSession } from "~/session/hooks";

const submitLargeStyle = {
  height: 48,
  borderRadius: 9999,
  fontWeight: 500,
  boxShadow: "none",
} as const;

const iconMuted = { color: "var(--mkt-muted)" } as const;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const loginMutation = useLogin();
  const session = useSession();
  const [token, setToken] = useState<string | null>(null);

  return (
    <ProForm
      layout="vertical"
      requiredMark={false}
      size="large"
      submitter={{
        searchConfig: { submitText: "Sign in" },
        submitButtonProps: {
          block: true,
          loading: loginMutation.isPending,
          size: "large",
          style: submitLargeStyle,
        },
        resetButtonProps: false,
      }}
      onFinish={async (values) => {
        if (isTurnstileEnabled() && !token) {
          message.error("Please complete the security check before signing in.");
          return false;
        }
        try {
          await loginMutation.mutateAsync({
            email: values.email as string,
            password: values.password as string,
            token: token ?? "",
          });
          await session?.refreshUserSession?.();
          message.success("Signed in successfully.");
          navigate(href("/:locale?/admin/dashboard", { locale }), {
            replace: true,
          });
          return true;
        } catch (error) {
          message.error((error as Error)?.message ?? "Sign in failed.");
          return false;
        }
      }}
    >
      <ProFormText
        name="email"
        label="Work email"
        placeholder="you@company.com"
        fieldProps={{
          prefix: <MailOutlined style={iconMuted} />,
          autoComplete: "email",
          allowClear: true,
        }}
        rules={[
          { required: true, message: "Enter your email address." },
          { type: "email", message: "Enter a valid email address." },
        ]}
      />
      <ProFormText.Password
        name="password"
        label="Password"
        placeholder="Enter your password"
        fieldProps={{
          prefix: <LockOutlined style={iconMuted} />,
          autoComplete: "current-password",
        }}
        rules={[
          { required: true, message: "Enter your password." },
          { min: 6, message: "Use at least 6 characters." },
        ]}
      />
      <Form.Item style={{ marginBottom: 8 }}>
        <TurnstileWidget handleSuccess={(t) => setToken(t)} />
      </Form.Item>
    </ProForm>
  );
};

export function Right() {
  const { locale } = useParams();
  const screens = Grid.useBreakpoint();

  return (
    <Card
      style={{
        width: "100%",
        borderRadius: 28,
        border: "1px solid var(--mkt-border)",
        boxShadow: "var(--mkt-shadow)",
        backdropFilter: "blur(8px)",
        background: "color-mix(in srgb, var(--mkt-surface) 92%, transparent)",
      }}
      styles={{ body: { padding: "clamp(24px, 4vw, 40px)" } }}
    >
      <div style={{ marginBottom: 4 }}>
        <Typography.Title level={3} style={{ margin: 0, color: "var(--mkt-text)" }}>
          Sign in
        </Typography.Title>
        <Typography.Text style={{ color: "var(--mkt-muted)", fontSize: 15 }}>
          Use your credentials to access {AUTH_PRODUCT_NAME}.
        </Typography.Text>
      </div>
      <Divider style={{ margin: "22px 0", borderColor: "var(--mkt-border)" }} />
      <LoginForm />
      <Flex
        vertical={!screens.sm}
        gap={12}
        align={screens.sm ? "center" : undefined}
        justify={screens.sm ? "space-between" : undefined}
        style={{ marginTop: 32, fontSize: 14 }}
      >
        <Typography.Text style={{ color: "var(--mkt-muted)" }}>
          New here?{" "}
          <Link
            to={href("/:locale?/auth/signup", { locale })}
            style={{ fontWeight: 500, color: "var(--mkt-accent)" }}
          >
            Create an account
          </Link>
        </Typography.Text>
        <Link to={href("/:locale?", { locale })} style={{ color: "var(--mkt-muted)" }}>
          ← Back to home
        </Link>
      </Flex>
    </Card>
  );
}
