import { Dropdown, Form } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { simpleStorage } from "@/libs/simpleStorage";
import { useNavigate, useParams } from "@remix-run/react";

import React from "react";
import { useTranslation } from "react-i18next";

type AvatarDropDownProps = {
  dom: any;
};

export const AvatarDropDown: React.FC<AvatarDropDownProps> = ({ dom }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lang } = useParams();

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "profile-center",
            icon: <UserOutlined />,
            label: t("personal-center"),
            onClick: () => {
              navigate(`/${lang}/admin/profile/account`);
            },
          },
          {
            type: "divider",
          },
          {
            key: "logout",
            icon: (
              <Form method="post" action="/logout">
                <LogoutOutlined />
              </Form>
            ),
            label: t("logout"),
            onClick() {
              simpleStorage.clearAllToken();
              navigate(`/${lang}/admin/login`, { replace: true });
            },
          },
        ],
      }}
    >
      {dom}
    </Dropdown>
  );
};
