// types
import type {
  ActionFunction,
  ActionFunctionArgs,
  MetaFunction,
} from "@remix-run/node";

// react
import { useContext, useState } from "react";

// remix
import { useFetcher, useNavigate, useParams } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

// i18n:hooks
import { useTranslation } from "react-i18next";

// components
import { LoginForm, ProFormCheckbox } from "@ant-design/pro-components";
import { Tabs, ConfigProvider } from "antd";
import { ActionIcons } from "~/components/userLogin";
import Footer from "~/components/Footer";

// styles
import "~/styles/login.css";

// context
import SettingContext from "~/context/settingContext";
import AccountLogin from "~/components/login/AccountLogin";
import MobileLogin from "~/components/login/MobileLogin";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "用户登录",
    },
  ];
};

// remix:action
export const action: ActionFunction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const lang = params.lang || "zh-CN";
  const data = await request.json();

  if (data.username === "admin" && data.password === "123456") {
    return redirect(`/${lang}/dashboard/analysis`);
  }
  return json({
    message: "登录失败",
  });
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { lang } = useParams();
  const value = useContext(SettingContext);
  const fetcher = useFetcher();
  const { t } = useTranslation();
  const [type, setType] = useState<string>("account");

  if (!lang) {
    navigate(-1);
    return null;
  }

  const handleSubmit = async (values: any) => {
    fetcher.submit(values, { method: "post", encType: "application/json" });
  };

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
              <img
                alt="logo"
                src="/logo.png"
                style={{ borderRadius: "10px" }}
              />
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
            {type === "account" && <AccountLogin />}
            {type === "mobile" && <MobileLogin />}
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
}
