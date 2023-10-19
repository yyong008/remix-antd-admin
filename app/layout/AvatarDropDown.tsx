import { useNavigate, useParams } from "@remix-run/react";

import * as _icons from "@ant-design/icons";
import { Dropdown } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const { LogoutOutlined, SettingOutlined, UserOutlined } = _icons;

type AvatarDropDownProps = {
  dom: any;
};

export const AvatarDropDown: React.FC<AvatarDropDownProps> = ({ dom }) => {
  const navigate = useNavigate();
  const { lang } = useParams();
  const { t } = useTranslation();

  const handleLogout = () => {
    navigate(`/${lang}/user/login`);
  };
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "profile-center",
            icon: <UserOutlined />,
            label: t("personal-center"),
            onClick: () => {
              navigate("/");
            },
          },
          {
            key: "profile-settings",
            icon: <SettingOutlined />,
            label: t("personal-settings"),
            onClick: () => {
              navigate("/");
            },
          },
          {
            type: "divider",
          },
          {
            key: "logout",
            icon: <LogoutOutlined />,
            label: t("logout"),
            onClick: () => {
              handleLogout();
            },
          },
        ],
      }}
    >
      {dom}
    </Dropdown>
  );
};
