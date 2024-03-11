// import type { ActionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs, LoaderFunction } from "@remix-run/node";

// react
import { useContext, useMemo, memo, useState } from "react";

// remix
import { json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

// components
import { Spin } from "antd";
import { ProLayout } from "@ant-design/pro-components";
import Footer from "~/components/Footer";
import MenuFooterRender from "~/layout/MenuFooterRender";
import { AvatarDropDown } from "~/layout/AvatarDropDown";
import { SettingDrawerWrap } from "~/layout/SettingDrawerWrap";
import { createActionRenderWrap } from "~/layout/createActionsRender";

// context
import SettingContext from "~/context/settingContext";

// libs
import { createRoute } from "~/services/route/routes";
import { config } from "~/config/index";
import { createTokens } from "~/layout/createToken";
import { handleRoutes } from "~/utils/route.handle";
import i18n from "~/i18n/i18next.server";

// hooks
import { useNProgress } from "~/hooks/useNProgress";

const langs = ["zh-CN", "en-US"];

// meta:loader(layout loader)
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
  useNProgress();
  const { routes } = useLoaderData<typeof loader>();
  const value = useContext(SettingContext);
  const [pathname, setPathname] = useState(location.pathname);

  const myroutes = useMemo(() => handleRoutes(routes), [routes]);

  if (!myroutes) {
    return;
  }

  return (
    <Spin spinning={!myroutes}>
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
    </Spin>
  );
}

export default memo(AdminLayout);
