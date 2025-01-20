import * as clientUtils from "@/utils/client";

import { Button, Checkbox, Flex, Form, Input } from "antd";
import { ConfigProvider, message } from "antd";
import { Link, useNavigation } from "react-router";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProConfigProvider } from "@ant-design/pro-components";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { ActionIcons } from "@/components/user-login";
import React from "react";
import { SettingContext } from "@/context/setting-context";
import { defaultLang } from "@/config/lang";
import { login } from "~/admin/apis/auth";
import { simpleStorage } from "@/libs/simpleStorage";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { useNProgress } from "@/hooks/useNprogress";
import { useParamsLang } from "~/hooks/userParamsLang";
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParamsLang();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values: any) => {
    const data = {
      ...values,
      password: clientUtils.genHashedPassword(values.password),
    };
    setIsLoading(true);
    const result: any = await login(data);
    setIsLoading(false);
    if (result.code === 0 && result.data.token?.length > 0) {
      const { token, refresh_token } = result.data;
      simpleStorage.setToken(token);
      simpleStorage.setRefreshToken(refresh_token);
      message.success(result.data.message);
      navigate(`/${lang}/admin/dashboard`, { replace: true });
    } else {
      if (
        result.code === 1 &&
        result.message === '"exp" claim timestamp check failed'
      ) {
        message.error("登录已过期，请重新登录");
        return;
      }
      message.error(result.message ?? "登录失败");
    }
    return true;
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
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={isLoading}>
          登陆
        </Button>
      </Form.Item>
    </Form>
  );
};

export function Right() {
  return (
    <div className="relative flex flex-col justify-center items-center w-1/2 gap-10 h-[100%]">
      <LogoImg />
      <div className="flex flex-col items-center text-4xl gap-3">
        <div className="mb-[20px]">Remix Antd Admin</div>
        <div>👏欢迎 ~</div>
      </div>
      <div className="text-gray-500">输入你的用户和密码</div>
      <App />
      <Register />
      <Tip />
    </div>
  );
}

function Register() {
  const { lang } = useParamsLang();
  return (
    <div className="absolute top-[40px] right-[40px] text-gray-700">
      <Link to={"/" + lang + "/admin/register"}>注册</Link>
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
