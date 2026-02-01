import { Button, Card, Divider, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import React from "react";
import { message } from "antd";

import { useColorPrimary } from "~/hooks/useColorPrimary";
import { useLogin } from "~/api-client/queries/auth";
import { useParamsLang } from "~/hooks/userParamsLang";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParamsLang();
  const loginMutation = useLogin();

  const onFinish = async (values: any) => {
    try {
      await loginMutation.mutateAsync({
        username: values.username,
        password: values.password,
      });
      message.success("Signed in successfully");
      navigate(`/${lang}/admin/dashboard`, { replace: true });
      return true;
    } catch (error) {
      message.error((error as Error)?.message ?? "Sign in failed");
      return false;
    }
  };

  return (
    <Form name="login" onFinish={onFinish} size="large" layout="vertical">
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please enter your username or email.",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Username or email"
          autoComplete="username"
          allowClear
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please enter your password.",
          },
          {
            min: 6,
            message: "Password must be at least 6 characters.",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          autoComplete="current-password"
        />
      </Form.Item>

      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          loading={loginMutation.isPending}
        >
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export function Right() {
  const p = useColorPrimary();
  return (
    <Card
      className="w-full max-w-[520px] shadow-[0_20px_80px_rgba(15,23,42,0.12)]"
      bordered={false}
      styles={{ body: { padding: "32px" } }}
    >
      <div className="flex items-center gap-3">
        <LogoImg />
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Remix Antd Admin
          </Typography.Title>
          <Typography.Text type="secondary">
            Sign in to continue
          </Typography.Text>
        </div>
      </div>
      <Divider style={{ margin: "20px 0" }} />
      <LoginForm />
      <div className="flex items-center justify-between text-sm">
        <Typography.Text type="secondary">
          New here?{" "}
          <Link to="/auth/signup" style={{ color: p.colorPrimary }}>
            Create an account
          </Link>
        </Typography.Text>
        <Link to="/" className="text-gray-500">
          Back to home
        </Link>
      </div>
    </Card>
  );
}

function LogoImg() {
  return <img className="w-[44px] rounded-xl" alt="logo" src="/logo.png" />;
}
