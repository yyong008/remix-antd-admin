import * as clientUtils from "@/utils/client";

import { ConfigProvider, message } from "antd";
import { Link, useNavigate, useParams } from "react-router";
import { LoginForm, ProConfigProvider } from "@ant-design/pro-components";
import { useContext, useState } from "react";

import { ActionIcons } from "@/components/user-login";
import { SettingContext } from "@/context/setting-context";
import { defaultLang } from "@/config/lang";
import { login } from "~/admin/apis/auth";
import { simpleStorage } from "@/libs/simpleStorage";
import { useNProgress } from "@/hooks/useNprogress";
import { useTranslation } from "react-i18next";

function LogoImg() {
  return <img alt="logo" src="/logo.png" style={{ borderRadius: "10px" }} />;
}

function ActionOther({ t, lang }: any) {
  return (
    <div
      className="flex justify-between items-centermt-[20px] text-black"
      key="login-other"
    >
      <data className="flex items-center">
        <div>{t("login-register.other-login")}</div>
        <ActionIcons key="icons" />
      </data>

      <div className="flex justify-between items-center">
        <Link to={`/${lang}/admin/register`}>register</Link>
      </div>
    </div>
  );
}

export function LoginFormWrap({ children }: any) {
  useNProgress();
  const initialValues = {
    autoLogin: true,
    username: "super admin",
    password: "123456",
  };
  const navigate = useNavigate();
  const value = useContext(SettingContext);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { lang = defaultLang } = useParams();

  const handleSubmit = async (values: any) => {
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
    <ProConfigProvider>
      <ConfigProvider
        theme={{
          token: value.theme,
        }}
      >
        <div className="flex  w-[100vw] flex-col h-[100vh]">
          <div className="w-[50vw]">sdf</div>
          <div className="flex w-[50vw] flex-col h-[100vh]">
            <LoginForm
              className="flex-1 text-slate-950"
              loading={isLoading}
              logo={<LogoImg />}
              title={t("login-register.title")}
              subTitle={t("login-register.desc")}
              initialValues={initialValues}
              actions={[<ActionOther t={t} lang={lang} key="login-other" />]}
              onFinish={async (values: string) => {
                await handleSubmit(values);
              }}
              submitter={{
                searchConfig: {
                  submitText: t("login-register.submit"),
                },
              }}
            >
              {children}
            </LoginForm>
          </div>
        </div>
      </ConfigProvider>
    </ProConfigProvider>
  );
}
