// types
import type {
  ActionFunction,
  ActionFunctionArgs,
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";

// core
import { json, redirect } from "@remix-run/node";

// hooks
import { useContext, useState } from "react";
import {
  useActionData,
  useFetcher,
  useNavigate,
  useParams,
} from "@remix-run/react";

// i18n:hooks
import { useTranslation } from "react-i18next";

// components
import { ActionIcons } from "~/components/userLogin";
import Footer from "~/components/Footer";

// component:vendor
import {
  LoginForm,
  ProFormText,
  ProFormCaptcha,
  ProFormCheckbox,
} from "@ant-design/pro-components";
import { message, Tabs, ConfigProvider } from "antd";
import * as _icons from "@ant-design/icons";

// styles
import loginStyleUrl from "~/styles/login.css";

// context
import SettingContext from "~/context/settingContext";

const { LockOutlined, MobileOutlined, UserOutlined } = _icons;

export const meta: MetaFunction = () => {
  return [
    {
      title: "登录",
    },
  ];
};

export const action: ActionFunction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = request.formData();
  const lang = params.lang || "zh-CN";
  const username = (await formData).get("username");
  const password = (await formData).get("password");

  if (username === "admin" && password === "123456") {
    return redirect(`/${lang}/dashboard/analysis`);
  }
  return json({
    message: "登录失败",
  });
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "preload",
      href: loginStyleUrl,
    },
  ];
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParams();
  const value = useContext(SettingContext);
  const fetcher = useFetcher();
  const { t } = useTranslation();
  const [type, setType] = useState<string>("account");
  const actionData = useActionData();

  if (!lang) {
    navigate(-1);
    return null;
  }
  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("type", type);

    if (type === "account") {
      formData.append("username", values.username);
      formData.append("password", values.password);
    } else {
      formData.append("mobile", values.mobile);
      formData.append("captcha", values.captcha);
    }

    fetcher.submit(formData, { method: "post" });
  };

  console.log("actionData", actionData);

  return (
    <ConfigProvider
      theme={{
        token: value.theme,
      }}
    >
      <div>
        <div>
          <LoginForm
            contentStyle={{
              minWidth: 280,
              maxWidth: "75vw",
            }}
            loading={
              fetcher.state === "loading" || fetcher.state === "submitting"
            }
            logo={
              <img alt="logo" src="/logo.png" style={{ borderRadius: "60%" }} />
            }
            title={t("title")}
            subTitle={t("desc")}
            initialValues={{
              autoLogin: true,
              username: "admin",
              password: "123456",
            }}
            actions={[t("other-login"), <ActionIcons key="icons" />]}
            onFinish={async (values: string) => {
              await handleSubmit(values);
            }}
            submitter={{
              searchConfig: {
                submitText: t("submit"),
              },
            }}
          >
            <Tabs
              activeKey={type}
              onChange={setType}
              centered
              items={[
                {
                  key: "account",
                  label: t("account-password-login"),
                },
                {
                  key: "mobile",
                  label: t("phone-number-login"),
                },
              ]}
            />
            {type === "account" && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: "large",
                    prefix: <UserOutlined />,
                  }}
                  placeholder={t("user-placeholder") as string}
                  rules={[
                    {
                      required: true,
                      message: t("user-message")!,
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: "large",
                    prefix: <LockOutlined />,
                  }}
                  placeholder={t("password-pladeholder") as string}
                  rules={[
                    {
                      required: true,
                      message: t("password-message") as string,
                    },
                  ]}
                />
              </>
            )}
            {type === "mobile" && (
              <>
                <ProFormText
                  fieldProps={{
                    size: "large",
                    prefix: <MobileOutlined />,
                  }}
                  name="mobile"
                  placeholder={t("phone-placeholder")!}
                  rules={[
                    {
                      required: true,
                      message: t("phone-message")!,
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: t("phone-format-message")!,
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: "large",
                    prefix: <LockOutlined />,
                  }}
                  captchaProps={{
                    size: "large",
                  }}
                  placeholder={t("verification-code")!}
                  captchaTextRender={(timing: boolean, count: number) => {
                    if (timing) {
                      return `${count} ${t("get-verification-code")}`;
                    }
                    return t("get-verification-code");
                  }}
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: t("verification-code")!,
                    },
                  ]}
                  onGetCaptcha={async () => {
                    message.success(t("get-captcha")!);
                  }}
                />
              </>
            )}
            <div style={{ margin: "10px 0px" }}>
              <ProFormCheckbox noStyle name="autoLogin">
                {t("remeber")}
              </ProFormCheckbox>
            </div>
          </LoginForm>
        </div>
        <Footer />
      </div>
    </ConfigProvider>
  );
};

export default LoginPage;
