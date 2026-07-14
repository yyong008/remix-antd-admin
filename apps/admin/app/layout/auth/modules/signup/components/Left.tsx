import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { ProForm, ProFormText } from "~/components/pro-form-kit";
import { Card, Divider, Flex, Form, Grid, Typography, message } from "antd";
import type React from "react";
import { useState } from "react";
import { Link, href, useNavigate, useParams } from "react-router";
import { useEamilSignup } from "~/api-client/queries/auth/auth";
import { TurnstileWidget } from "~/components/captcha";
import { isTurnstileEnabled } from "~/config/turnstile";
import { AUTH_PRODUCT_NAME } from "~/layout/auth/AuthMarketingShell";

const submitLargeStyle = {
  height: 48,
  borderRadius: 9999,
  fontWeight: 500,
  boxShadow: "none",
} as const;

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const signupMutation = useEamilSignup();
  const [token, setToken] = useState<string | null>(null);

  return (
    <ProForm
      layout="vertical"
      requiredMark={false}
      size="large"
      submitter={{
        searchConfig: { submitText: "Create account" },
        submitButtonProps: {
          block: true,
          loading: signupMutation.isPending,
          size: "large",
          style: submitLargeStyle,
        },
        resetButtonProps: false,
      }}
      onFinish={async (values) => {
        if (isTurnstileEnabled() && !token) {
          message.error("Please complete the security check before continuing.");
          return false;
        }
        try {
          await signupMutation.mutateAsync({
            username: values.username as string,
            email: values.email as string,
            password: values.password as string,
            token: token ?? "",
          });
          message.success("Your account is ready. You can sign in now.");
          navigate(href("/:locale?/auth/login", { locale }), { replace: true });
          return true;
        } catch (error) {
          message.error((error as Error)?.message ?? "Sign up failed.");
          return false;
        }
      }}
    >
      <ProFormText
        name="username"
        label="Display name"
        placeholder="How we should address you"
        fieldProps={{
          prefix: <UserOutlined />,
          autoComplete: "username",
          allowClear: true,
        }}
        rules={[
          { required: true, message: "Enter a display name." },
          { min: 2, message: "Use at least 2 characters." },
          { max: 64, message: "Keep it under 64 characters." },
        ]}
      />
      <ProFormText
        name="email"
        label="Work email"
        placeholder="you@company.com"
        fieldProps={{
          prefix: <MailOutlined />,
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
        placeholder="At least 6 characters"
        fieldProps={{
          prefix: <LockOutlined />,
          autoComplete: "new-password",
        }}
        rules={[
          { required: true, message: "Choose a password." },
          { min: 6, message: "Use at least 6 characters." },
        ]}
      />
      <Form.Item style={{ marginBottom: 8 }}>
        <TurnstileWidget handleSuccess={(t) => setToken(t)} />
      </Form.Item>
    </ProForm>
  );
};

export function Left() {
  const { locale } = useParams();
  const screens = Grid.useBreakpoint();

  return (
    <Card
      style={{
        width: "100%",
        borderRadius: 28,
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
        backdropFilter: "blur(8px)",
      }}
      styles={{ body: { padding: "clamp(24px, 4vw, 40px)" } }}
    >
      <div style={{ marginBottom: 4 }}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Create account
        </Typography.Title>
        <Typography.Text style={{ fontSize: 15 }}>
          Join {AUTH_PRODUCT_NAME} and open the admin console in one step.
        </Typography.Text>
      </div>
      <Divider style={{ margin: "22px 0" }} />
      <RegisterForm />
      <Flex
        vertical={!screens.sm}
        gap={12}
        align={screens.sm ? "center" : undefined}
        justify={screens.sm ? "space-between" : undefined}
        style={{ marginTop: 32, fontSize: 14 }}
      >
        <Typography.Text>
          Already registered?{" "}
          <Link
            to={href("/:locale?/auth/login", { locale })}
            style={{ fontWeight: 500, color: "#6366f1" }}
          >
            Sign in
          </Link>
        </Typography.Text>
        <Link to={href("/:locale?", { locale })}>← Back to home</Link>
      </Flex>
    </Card>
  );
}
