import * as clientUtils from "@/utils/client";

import { ConfigProvider, message } from "antd";
import { Link, useNavigate, useParams } from "react-router";
import { LoginForm, ProConfigProvider } from "@ant-design/pro-components";
import { useContext, useState } from "react";

import { ActionIcons } from "@/components/user-login";
import { SettingContext } from "@/context/setting-context";
import { defaultLang } from "@/config/lang";
import { register } from "~/admin-auth/apis";
import { useNProgress } from "@/hooks/useNprogress";
import { useTranslation } from "react-i18next";

function LogoImg() {
  return <img alt="logo" src="/logo.png" style={{ borderRadius: "10px" }} />;
}

function ActionOther({ t, lang }: any) {
  return (
    <div
      className="flex justify-between items-centermt-[20px] text-black"
      key="register-other"
    >
      <data className="flex items-center">
        <div>{t("other-register")}</div>
        <ActionIcons key="icons" />
      </data>

      <div className="flex justify-between items-center">
        <Link to={`/${lang}/admin/login`}>login</Link>
      </div>
    </div>
  );
}

export function LoginFormWrap({ children }: any) {
  useNProgress();

  const navigate = useNavigate();
  const value = useContext(SettingContext);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { lang = defaultLang } = useParams();

  const handleSubmit = async (values: any) => {
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
    return true;
  };

  return (
    <ProConfigProvider>
      <ConfigProvider
        theme={{
          token: value.theme,
        }}
      >
        <div className="flex flex-col h-[100vh]">
          <LoginForm
            className="flex-1 text-slate-950"
            loading={isLoading}
            logo={<LogoImg />}
            title={t("login-register.title")}
            subTitle={t("login-register.desc")}
            actions={[<ActionOther t={t} lang={lang} key="register-other" />]}
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
      </ConfigProvider>
    </ProConfigProvider>
  );
}
