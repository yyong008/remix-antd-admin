// import type { ActionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs, LoaderFunction } from "@remix-run/node";

import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { useContext, useMemo, memo, useState } from "react";
import { json, redirect } from "@remix-run/node";

// components:vendor

import { PageContainer, ProLayout } from "@ant-design/pro-components";

// components
import Footer from "~/components/Footer";
import MenuFooterRender from "~/layout/MenuFooterRender";

// context
import SettingContext from "~/context/settingContext";

// routes from mock db
import { createRoute } from "~/db/index";

// layout
import { SettingDrawerWrap } from "~/layout/SettingDrawerWrap";
import { AvatarDropDown } from "~/layout/AvatarDropDown";
import { createActionRenderWrap } from "~/layout/createActionsRender";
import { config } from "~/layout/config";
import { createTokens } from "~/layout/createToken";
import i18n from "~/i18n/i18next.server";
import { Spin } from "antd";
import { handleRoutes } from "~/utils/route.handle";

const langs = ["zh-CN", "en-US"];

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const { lang } = params;
  let t = await i18n.getFixedT(lang!);
  if (!langs.includes(typeof lang === "string" ? lang : "")) {
    return redirect("/404"); // 404 is $.tsx routes
  }
  return json({ routes: createRoute(lang!, t) });
};

function AdminLayout() {
  const { routes } = useLoaderData();
  const value = useContext(SettingContext);
  const [pathname, setPathname] = useState(location.pathname);

  const myroutes = useMemo(() => handleRoutes(routes), [routes]);

  if (!myroutes) {
    return;
  }

  return (
    <Spin spinning={!myroutes}>
      <PageContainer>
        <ProLayout
          {...myroutes}
          {...value.theme}
          loading={false}
          title={config.title}
          logo={config.logo}
          layout={config.layout as any}
          token={createTokens(value)}
          ErrorBoundary={false}
          pageTitleRender={false}
          breadcrumbRender={false}
          menu={config.menu}
          location={{
            pathname,
          }}
          menuItemRender={(item, dom) => (
            <Link
              to={item.path!}
              onClick={() => {
                setPathname(item.path || "/welcome");
              }}
            >
              {dom}
            </Link>
          )}
          actionsRender={createActionRenderWrap({ value })}
          avatarProps={{
            src: config.avatar.src,
            size: config.avatar.size as any,
            title: config.avatar.title,
            render: (_, dom) => {
              return <AvatarDropDown dom={dom} />;
            },
          }}
          menuFooterRender={MenuFooterRender}
          footerRender={() => <Footer />}
        >
          <Outlet />
          <SettingDrawerWrap theme={value.theme} setTheme={value.setTheme} />
        </ProLayout>
      </PageContainer>
    </Spin>
  );
}

export default memo(AdminLayout);
