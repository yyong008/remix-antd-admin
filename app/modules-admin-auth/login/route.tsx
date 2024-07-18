import { ConfigProvider, Tabs } from "antd";
import { ProConfigProvider, ProFormCheckbox } from "@ant-design/pro-components";
import { memo, useContext, useMemo, useState } from "react";

import { AccountLogin } from "./components/account-login";
import { LoginFormWrap } from "./components/login-form";
import { MobileLogin } from "./components/mobile-login";
import { SettingContext } from "@/context";
import { useNProgress } from "@/hooks";
import { useTranslation } from "react-i18next";

export function Route() {
  useNProgress();
  const { t } = useTranslation();
  const value = useContext(SettingContext);
  const [type, setType] = useState<string>("account");

  const items = useMemo(() => {
    return [
      {
        key: "account",
        label: t("login-register.account-login"),
      },
      {
        key: "mobile",
        disabled: true,
        label: t("login-register.phone-login"),
      },
    ];
  }, [t]);

  const RemeberMe = memo(function Re() {
    return (
      <div style={{ margin: "10px 0px" }} className="text-black">
        <ProFormCheckbox name="autoLogin">
          {t("login-register.remeber")}
        </ProFormCheckbox>
      </div>
    );
  });

  return (
    <ProConfigProvider>
      <ConfigProvider
        theme={{
          token: value.theme,
        }}
      >
        <div className="flex flex-col h-[100vh]  ">
          <LoginFormWrap>
            <Tabs activeKey={type} onChange={setType} centered items={items} />
            {type === "account" && <AccountLogin />}
            {type === "mobile" && <MobileLogin />}
            <RemeberMe />
          </LoginFormWrap>
        </div>
      </ConfigProvider>
    </ProConfigProvider>
  );
}
