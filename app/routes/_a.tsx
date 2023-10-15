// import type { ActionArgs } from "@remix-run/node";
import { useContext, useMemo, useState, memo, useEffect } from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useParams,
  useSubmit,
} from "@remix-run/react";

// components:vendor

import {
  PageContainer,
  ProLayout,
  SettingDrawer,
} from "@ant-design/pro-components";
import { Dropdown } from "antd";
import * as _icons from "@ant-design/icons";

// components
import Footer from "~/components/Footer";

// context
import SettingContext from "~/context/settingContext";

// sidebar routes
import { createRoute } from "~/components/SideBar";

// hooks
import { useTranslation } from "react-i18next";
import {
  LoaderFunctionArgs,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";

const langs = ["zh-CN", "en-US"];

const {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled,
  SettingOutlined,
  TranslationOutlined,
  UserOutlined,
} = _icons;

export const loader: LoaderFunction = ({ params }: LoaderFunctionArgs) => {
  const { lang } = params;
  if (!langs.includes(typeof lang === "string" ? lang : "")) {
    return redirect("/404"); // 404 is $.tsx routes
  }
  return json({ lang });
};

function AdminLayout() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const value = useContext(SettingContext);
  // const [userInfo] = useState<any>({});
  // const submit = useSubmit();
  const { lang } = useParams();

  const choiceLang = (lang: string) => {
    let p = location.pathname.split("/");
    p[1] = lang || "en-US";

    navigate(p.join("/").trim(), {
      replace: true,
    });

    value.setLang(lang || "en-US");
    window.location.href = p.join("/").trim();
  };

  const routes = useMemo(() => {
    return createRoute(value.lang, t);
  }, [value.lang, t]);

  const goGithub = () => {
    let aTag: any = document.createElement("a");
    aTag.setAttribute("href", "https://github.com/yyong008/remix-antd-admin");
    aTag.setAttribute("target", "_blank");
    aTag.click();
    aTag = null;
  };

  const handleLogout = () => {
    navigate(`/${lang}/user/login`);
  };
  return (
    <PageContainer>
      <ProLayout
        title="Remix/Antd/Admin"
        logo="/remix.svg"
        {...value.theme}
        {...routes}
        layout="mix"
        token={{
          header: {
            // colorBgHeader: value.theme.colorPrimary,
          },
          sider: {
            // colorBgMenuItemSelected: "rgba(0, 0, 0, 0.027)",
            colorTextMenuSelected: value.theme.colorPrimary,
          },
        }}
        ErrorBoundary={false}
        pageTitleRender={false}
        // suppressSiderWhenMenuEmpty={userInfo && userInfo?.routes?.length === 0}
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
            <GithubFilled key="GithubFilled" onClick={goGithub} />,
            <Dropdown
              menu={{
                items: [
                  {
                    key: "en",
                    label: "EN English",
                    onClick: () => {
                      choiceLang("en-US");
                    },
                  },
                  {
                    key: "cn",
                    label: "CN 简体中文",
                    onClick: () => {
                      choiceLang("zh-CN");
                    },
                  },
                ],
              }}
            >
              <TranslationOutlined />
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
        <SettingDrawer
          getContainer={() => document.body}
          enableDarkTheme
          onSettingChange={(settings: any) => {
            value.setTheme(settings);
          }}
          settings={{ ...value.theme }}
        />
      </ProLayout>
    </PageContainer>
  );
}

export default memo(AdminLayout);
