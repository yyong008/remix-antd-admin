// import type { ActionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs, LoaderFunction } from "@remix-run/node";

import { Link, Outlet } from "@remix-run/react";
import { useContext, useMemo, memo } from "react";
import { json, redirect } from "@remix-run/node";

// components:vendor

import { PageContainer, ProLayout } from "@ant-design/pro-components";

// components
import Footer from "~/components/Footer";
import MenuFooterRender from "~/layout/MenuFooterRender";

// context
import SettingContext from "~/context/settingContext";

// sidebar routes
import { createRoute } from "~/components/SideBar";

// hooks
import { useTranslation } from "react-i18next";

// layout
import { SettingDrawerWrap } from "~/layout/SettingDrawerWrap";
import { AvatarDropDown } from "~/layout/AvatarDropDown";
import { createActionRenderWrap } from "~/layout/createActionsRender";
import { config } from "~/layout/config";
import { createTokens } from "~/layout/createToken";

const langs = ["zh-CN", "en-US"];

export const loader: LoaderFunction = ({ params }: LoaderFunctionArgs) => {
  const { lang } = params;
  if (!langs.includes(typeof lang === "string" ? lang : "")) {
    return redirect("/404"); // 404 is $.tsx routes
  }
  return json({ lang });
};

function AdminLayout() {
  const { t } = useTranslation();
  const value = useContext(SettingContext);

  const routes = useMemo(() => createRoute(value.lang, t), [value.lang, t]);

  return (
    <PageContainer>
      <ProLayout
        {...routes}
        {...value.theme}
        title={config.title}
        logo={config.logo}
        layout={config.layout as any}
        token={createTokens(value)}
        ErrorBoundary={false}
        pageTitleRender={false}
        breadcrumbRender={false}
        menu={config.menu}
        menuItemRender={(item, dom) => (
          <Link to={item.path as string}>{dom}</Link>
        )}
        actionsRender={createActionRenderWrap({ value })}
        avatarProps={{
          src: config.avatar.src,
          size: config.avatar.size as any,
          title: config.avatar.title,
          render: (_, dom) => {
            return <AvatarDropDown t={t} dom={dom} />;
          },
        }}
        menuFooterRender={MenuFooterRender}
        footerRender={() => <Footer />}
      >
        <Outlet />
        <SettingDrawerWrap theme={value.theme} setTheme={value.setTheme} />
      </ProLayout>
    </PageContainer>
  );
}

export default memo(AdminLayout);
