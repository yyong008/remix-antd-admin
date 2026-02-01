import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { Link } from "react-router";
import React from "react";
import { message } from "antd";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { useNavigate } from "react-router";
import { useParamsLang } from "~/hooks/userParamsLang";
import { useLogin } from "~/api-client/queries/auth";
import { useTranslation } from "react-i18next";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParamsLang();
  const loginMutation = useLogin();

  const onFinish = async (values: any) => {
    try {
      await loginMutation.mutateAsync({
        username: values.username,
        password: values.password,
      });
      message.success("登录成功");
      navigate(`/${lang}/admin/dashboard`, { replace: true });
      return true;
    } catch (error) {
      message.error((error as Error)?.message ?? "登录失败");
      return false;
    }
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ width: 560 }}
      onFinish={onFinish}
      size="large"
      layout="vertical"
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: t("login-register.message.username-message")!,
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder={t("login-register.placeholder.username") as string}
          autoComplete="username"
          allowClear
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: t("login-register.message.password-message") as string,
          },
          {
            min: 6,
            message: t("login-register.message.password-message") as string,
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder={t("login-register.placeholder.password") as string}
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
          {t("login-register.submit")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export function Right() {
  const { t } = useTranslation();
  return (
    <div className="relative flex flex-col justify-center items-center w-1/2 gap-10 h-[100%]">
      <LogoImg />
      <div className="flex flex-col items-center text-4xl gap-3">
        <div className="mb-[20px]">{t("login-register.title")}</div>
        <div>👏 {t("login-register.account-login")} ~</div>
      </div>
      <div className="text-gray-500">{t("login-register.desc")}</div>
      <LoginForm />
      <GoRegister />
      <Tip />
    </div>
  );
}

function GoRegister() {
  const { lang } = useParamsLang();
  const { t } = { t: (key: string) => key };
  return (
    <div className="absolute top-[40px] right-[40px] text-gray-700">
      <Link to={"/" + lang + "/admin/register"}>
        {t("login-register.register")}
      </Link>
    </div>
  );
}

function Tip() {
  return (
    <div className="text-slate-400">
      By clicking continue, you agree to our Terms of Service and <GoPrivacy />.
    </div>
  );
}

function GoPrivacy() {
  const { lang } = useParamsLang();
  const p = useColorPrimary();
  return (
    <Link
      to={`/${lang}/privacy`}
      style={{ color: p.colorPrimary, textDecoration: "underline" }}
    >
      Privacy Policy
    </Link>
  );
}

function LogoImg() {
  return (
    <img
      className="w-[30px]"
      alt="logo"
      src="/logo.png"
      style={{ width: "100px" }}
    />
  );
}
