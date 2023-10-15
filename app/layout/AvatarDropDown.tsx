import { useNavigate, useParams } from "@remix-run/react";

import * as _icons from "@ant-design/icons";
import { Dropdown } from "antd";
import React from "react";

const { LogoutOutlined, SettingOutlined, UserOutlined } = _icons;

type AvatarDropDownProps = {
  t: any;
  dom: any;
};

export const AvatarDropDown: React.FC<AvatarDropDownProps> = ({ t, dom }) => {
  const navigate = useNavigate();
  const { lang } = useParams();
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
