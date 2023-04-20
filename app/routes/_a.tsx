// core
import { ClientOnly } from "remix-utils";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "@remix-run/react";

// components:vendor
import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  PageContainer,
  ProLayout,
  ProConfigProvider,
  SettingDrawer,
} from "@ant-design/pro-components";
import { Dropdown } from "antd";

// components
import Footer from "~/components/Footer";
import Auth from "~/components/Auth";

// context
import SettingContext from "~/settingContext";

// sidebar routes
import { createRoute } from "~/components/SideBar";

// hooks
import { useTranslation } from "react-i18next";

export default function Layout() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const value = useContext(SettingContext);
  const [userInfo, setUserInfo] = useState<any>();

  const choiceLang = (lang: string) => {
    let p = location.pathname.split("/");
    p[1] = lang || "us";
    value.setLang(lang || "us");
    window.location.pathname = p.join("/");
  };

  const fetchUserInfo = async () => {
    const userInfo = await fetch("/api/userinfo")
      .then((res) => res.json())
      .catch((e) => {
        console.log("e", e);
      });
    localStorage.setItem("userinfo", JSON.stringify(userInfo));
    setUserInfo(userInfo);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <PageContainer>
      <ClientOnly>
        {() => (
          <Auth routes={userInfo?.routes ?? []}>
            <ProLayout
              title="Remix"
              logo="/remix.png"
              {...value.theme}
              {...createRoute(value.lang, t)}
              waterMarkProps={{
                content: "Remix Antd Admin",
              }}
              token={{
                sider: {
                  colorBgMenuItemSelected: "rgba(0, 0, 0, 0.027)",
                  colorTextMenuSelected: value.theme.colorPrimary,
                },
              }}
              ErrorBoundary={false}
              pageTitleRender={false}
              suppressSiderWhenMenuEmpty={userInfo?.routes.length === 0}
              menu={{ defaultOpenAll: true, hideMenuWhenCollapsed: true }}
              menuItemRender={(item, dom) => (
                <Link to={item.path as string}>{dom}</Link>
              )}
              actionsRender={(props) => {
                if (props.isMobile) return [];
                return [
                  <InfoCircleFilled key="InfoCircleFilled" />,
                  <QuestionCircleFilled key="QuestionCircleFilled" />,
                  <GithubFilled key="GithubFilled" />,
                ];
              }}
              avatarProps={{
                src: "/images/user.jpg",
                size: "small",
                title: "小二",
                render: (_, dom) => {
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
                              navigate("/");
                            },
                          },
                          {
                            type: "divider",
                          },
                          {
                            key: "us",
                            label: "US English",
                            onClick: () => {
                              choiceLang("us");
                            },
                          },
                          {
                            key: "cn",
                            label: "CN 简体中文",
                            onClick: () => {
                              choiceLang("zh");
                            },
                          },
                        ],
                      }}
                    >
                      {dom}
                    </Dropdown>
                  );
                },
              }}
              bgLayoutImgList={[
                {
                  src: "",
                  left: 85,
                  bottom: 100,
                  height: "303px",
                },
                {
                  src: "",
                  bottom: -68,
                  right: -45,
                  height: "303px",
                },
                {
                  src: "/images/sidebar-bg.png",
                  bottom: 0,
                  left: 0,
                  width: "331px",
                },
              ]}
              menuFooterRender={(props) => {
                if (props?.collapsed) return undefined;
                return (
                  <div
                    style={{
                      textAlign: "center",
                      paddingBlockStart: 12,
                    }}
                  >
                    <div>© 2023 Made with love</div>
                    <div>by Magnesium</div>
                  </div>
                );
              }}
              footerRender={() => <Footer />}
            >
              <Outlet />
              <ProConfigProvider>
                <SettingDrawer
                  getContainer={() => document.body}
                  enableDarkTheme
                  onSettingChange={(settings: any) => {
                    value?.setTheme(settings);
                  }}
                  settings={{ ...value.theme }}
                />
              </ProConfigProvider>
            </ProLayout>
          </Auth>
        )}
      </ClientOnly>
    </PageContainer>
  );
}
