import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Spin, theme } from "antd";
import type { MenuProps } from "antd";
import { useNavigate, useParams } from "react-router";

import type React from "react";

import { useLogout } from "~/api-client/queries/auth/auth";
import { useSession } from "~/session/provider";

export type AdminHeaderUser = {
  name?: string | null;
  nickname?: string | null;
  email?: string | null;
  avatar?: string | null;
};

type AvatarDropDownProps = {
  user: AdminHeaderUser;
};

function displayName(u: AdminHeaderUser) {
  const n = u.nickname?.trim() || u.name?.trim();
  return n || u.email?.trim() || "User";
}

export const AvatarDropDown: React.FC<AvatarDropDownProps> = ({ user }) => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const { token } = theme.useToken();
  const { mutate: signOut } = useLogout();
  const { user: sessionUser, isLoading } = useSession();
  const isZh = locale === "zh";

  if (isLoading) {
    return <Spin size="small" />;
  }

  if (!sessionUser) {
    return (
      <Button
        type="primary"
        size="middle"
        onClick={() => navigate(`/${locale ? `${locale}/` : ""}auth/login`)}
      >
        {isZh ? "登录" : "Sign in"}
      </Button>
    );
  }

  const title = displayName(user);
  const subtitle = user.email?.trim() || "";

  const items: MenuProps["items"] = [
    {
      key: "profile-center",
      icon: <UserOutlined />,
      label: isZh ? "个人中心" : "Personal center",
      onClick: () => {
        navigate(`/${locale ? `${locale}/` : ""}admin/profile/account`);
      },
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: isZh ? "退出登录" : "Log out",
      danger: true,
      onClick: () => {
        signOut();
      },
    },
  ];

  const avatarSrc = user.avatar?.trim() || undefined;

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      menu={{ items }}
      popupRender={(menu) => (
        <div
          style={{
            overflow: "hidden",
            borderRadius: 12,
            border: `1px solid ${token.colorBorderSecondary}`,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            background: token.colorBgElevated,
            minWidth: 260,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
              padding: "12px 16px",
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
            }}
          >
            <Avatar src={avatarSrc} size={48} style={{ flexShrink: 0 }}>
              {title.slice(0, 1).toUpperCase()}
            </Avatar>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: 15,
                  fontWeight: 600,
                  lineHeight: 1.4,
                  color: token.colorText,
                }}
                title={title}
              >
                {title}
              </div>
              {subtitle ? (
                <div
                  style={{
                    marginTop: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: 12,
                    lineHeight: 1.4,
                    color: token.colorTextSecondary,
                  }}
                  title={subtitle}
                >
                  {subtitle}
                </div>
              ) : null}
            </div>
          </div>
          <div style={{ padding: "8px 0" }}>{menu}</div>
        </div>
      )}
    >
      <button
        type="button"
        aria-label={isZh ? "用户菜单" : "User menu"}
        style={{
          display: "inline-flex",
          cursor: "pointer",
          alignItems: "center",
          borderRadius: 8,
          border: "1px solid transparent",
          padding: 2,
          transition: "background-color 0.2s",
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.04)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        <Avatar src={avatarSrc} size="default">
          {title.slice(0, 1).toUpperCase()}
        </Avatar>
      </button>
    </Dropdown>
  );
};
