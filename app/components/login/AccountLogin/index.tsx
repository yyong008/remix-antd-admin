import * as _icons from "@ant-design/icons";
import { ProFormText } from "@ant-design/pro-components";

import { t } from "i18next";

const { UserOutlined, LockOutlined } = _icons;

export default function AccountLogin() {
  return (
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
  );
}
