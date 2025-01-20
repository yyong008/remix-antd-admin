import * as clientUtils from "@/utils/client";

import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { Link } from "react-router";
import React from "react";
import { message } from "antd";
import { register } from "~/admin/apis/auth";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { useNavigate } from "react-router";
import { useParamsLang } from "~/hooks/userParamsLang";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParamsLang();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 注册
   * @param values
   * @returns
   */
  const onFinish = async (values: any) => {
    if (values.password !== values.passwordRe) {
      message.error(t("login-register.password-re-not-equal"));
      return false;
    }
    const data = {
      ...values,
      password: clientUtils.genHashedPassword(values.password),
      passwordRe: clientUtils.genHashedPassword(values.passwordRe),
    };
    setIsLoading(true);
    const result: any = await register(data);
    setIsLoading(false);
    if (result.data.code === 0) {
      message.success(result.data.message);
      navigate(`/${lang}/admin/login`, { replace: true });
    } else {
      message.error(result.data.message);
    }
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ width: 560 }}
      onFinish={onFinish}
      size="large"
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
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: t("login-register.message.password-message") as string,
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder={t("login-register.placeholder.password") as string}
        />
      </Form.Item>
      <Form.Item
        name="passwordRe"
        rules={[
          {
            required: true,
            message: t("login-register.message.password-message-re") as string,
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder={t("login-register.placeholder.password-re") as string}
        />
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={isLoading}>
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
        <div>👏 {t("login-register.account-register")} ~</div>
      </div>
      <div className="text-gray-500">{t("login-register.desc")}</div>
      <LoginForm />
      <GoLogin />
      <Tip />
    </div>
  );
}

function GoLogin() {
  const { lang } = useParamsLang();
  const { t } = useTranslation();
  return (
    <div className="absolute top-[40px] left-[40px] text-gray-700">
      <Link to={"/" + lang + "/admin/login"}>{t("login-register.login")}</Link>
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
