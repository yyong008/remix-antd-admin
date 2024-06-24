import * as clientUtils from "~/utils/client";

import {
  AccountLogin,
  MobileLogin,
} from "~/modules/admin-auth/login/components/login";
import { ConfigProvider, Tabs } from "antd";
import { LoginForm, ProFormCheckbox } from "@ant-design/pro-components";
import { useContext, useState } from "react";
import { useFetcherChange, useNProgress } from "~/hooks";
import { useNavigate, useParams } from "@remix-run/react";

import { ActionIcons } from "~/components/user-login";
import { Footer } from "~/components/common";
import { SettingContext } from "~/context";
import { useTranslation } from "react-i18next";

export function Route() {
  useNProgress();
  const navigate = useNavigate();
  const { lang } = useParams();
  const value = useContext(SettingContext);
  const fetcher = useFetcherChange();
  const { t } = useTranslation();
  const [type, setType] = useState<string>("account");

  if (!lang) {
    navigate(-1);
    return null;
  }

  const handleSubmit = async (values: any) => {
    const vals = {
      ...values,
      password: clientUtils.genHashedPassword(values.password),
    };
    fetcher.submit(vals, { method: "POST", encType: "application/json" });
  };

  return (
    <ConfigProvider
      theme={{
        token: value.theme,
      }}
    >
      <div className="flex flex-col h-[100vh] justify-center">
        <LoginForm
          className="flex-1"
          loading={
            fetcher.state === "loading" || fetcher.state === "submitting"
          }
          logo={
            <img alt="logo" src="/logo.png" style={{ borderRadius: "10px" }} />
          }
          title={t("title")}
          subTitle={t("desc")}
          initialValues={{}}
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
                disabled: true,
                label: t("phone-number-login"),
              },
            ]}
          />
          {type === "account" && <AccountLogin isRegister />}
          {type === "mobile" && <MobileLogin />}
          <div style={{ margin: "10px 0px" }}>
            <ProFormCheckbox noStyle name="autoLogin">
              {t("remeber")}
            </ProFormCheckbox>
          </div>
        </LoginForm>
        <Footer />
      </div>
    </ConfigProvider>
  );
}
