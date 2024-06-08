import { useFetcher, useNavigate, useParams } from "@remix-run/react";

import * as _icons from "@ant-design/icons";
import { Dropdown, Form } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const { LogoutOutlined, UserOutlined } = _icons;

type AvatarDropDownProps = {
  dom: any;
};

export const AvatarDropDown: React.FC<AvatarDropDownProps> = ({ dom }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const fetcher = useFetcher();
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
            onClick(e) {
              fetcher.submit(
                {},
                {
                  method: "POST",
                  action: `/${lang}/admin/logout`,
                },
              );
            },
          },
        ],
      }}
    >
      {dom}
    </Dropdown>
  );
};
