// import type { ActionArgs } from "@remix-run/node";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useSubmit } from "@remix-run/react";

// components:vendor
import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled,
  SettingOutlined,
  TranslationOutlined,
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

// context
import SettingContext from "~/settingContext";

// sidebar routes
import { createRoute } from "~/components/SideBar";

// hooks
import { useTranslation } from "react-i18next";
import { LoaderArgs, LoaderFunction, json, redirect } from "@remix-run/node";

const langs = ['zh', 'en']

export const loader: LoaderFunction = ({ params }: LoaderArgs) => {
  const { lang } = params
  if (!langs.includes(typeof lang === 'string' ? lang: '')) {
    return redirect('/404') // 404 is $.tsx routes
  }
  return json({ lang })
}

export default function Layout() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const value = useContext(SettingContext);
  const [userInfo, setUserInfo] = useState<any>({});
  const submit = useSubmit();

  const choiceLang = (lang: string) => {
    let p = location.pathname.split("/");
    p[1] = lang || "en";

    navigate(p.join("/"));
    value.setLang(lang || "en");
  };

  const handleLogout = () => {
    submit(
      {},
      {
        method: "POST",
        action: `${value.lang}/api/logout`,
      }
    );
  };

  return (
    <PageContainer>
        <ProLayout
          title="Remix"
          logo="/remix.png"
          {...value.theme}
          {...createRoute(value.lang, t)}
          token={{
            sider: {
              colorBgMenuItemSelected: "rgba(0, 0, 0, 0.027)",
              colorTextMenuSelected: value.theme.colorPrimary,
            },
          }}
          ErrorBoundary={false}
          pageTitleRender={false}
          suppressSiderWhenMenuEmpty={userInfo && userInfo?.routes?.length === 0}
          menu={{ defaultOpenAll: false, hideMenuWhenCollapsed: true }}
          menuItemRender={(item, dom) => (
            <Link to={item.path as string}>{dom}</Link>
          )}
          breadcrumbRender={false}
          actionsRender={(props) => {
            if (props.isMobile) return [];
            return [
              <InfoCircleFilled key="InfoCircleFilled" />,
              <QuestionCircleFilled key="QuestionCircleFilled" />,
              <GithubFilled
                key="GithubFilled"
                onClick={() => {
                  let aTag: any = document.createElement("a");
                  aTag.setAttribute(
                    "href",
                    "https://github.com/yyong008/remix-antd-admin"
                  );
                  aTag.setAttribute("target", "_blank");
                  aTag.click();
                  aTag = null;
                }}
              />,
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "en",
                      label: "en English",
                      onClick: () => {
                        choiceLang("en");
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
                <TranslationOutlined key="TranslationOutlined" />
              </Dropdown>,
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
                          handleLogout();
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
    </PageContainer>
  );
}
