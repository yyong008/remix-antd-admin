// import type { ActionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs, LoaderFunction } from "@remix-run/node";

// react
import { useContext, useMemo, memo, useState } from "react";

// remix
import { json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

// components
import { ProLayout } from "@ant-design/pro-components";
import Footer from "~/components/common/Footer";
import MenuFooterRender from "~/layout/MenuFooterRender";
import { AvatarDropDown } from "~/layout/AvatarDropDown";
import { SettingDrawerWrap } from "~/layout/SettingDrawerWrap";
import { createActionRenderWrap } from "~/layout/createActionsRender";

// context
import SettingContext from "~/context/settingContext";

// config
import { config } from "~/config/index";
import { langs } from "~/config/lang";

import { createTokens } from "~/layout/createToken";

// utils
import { createProLayoutRoute } from "~/utils/prolayout.route.util";

// i18n
import i18n from "~/i18n/i18next.server";

// hooks
import { useNProgress } from "~/hooks/useNProgress";

// servies
import {
  destroySession,
  getSession,
  getUserId,
} from "~/services/common/auth.server";
import { getMenuByUserId } from "~/services/system/menu";
import { getUserInfoById } from "~/services/system/user";

// constants
import { ADMIN_ROUTE_PREFIX } from "~/constants";

// meta:loader
export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const { lang } = params;
  let t = await i18n.getFixedT(lang!);

  if (!langs.includes(typeof lang === "string" ? lang : "")) {
    return redirect("/404"); // 404 is $.tsx routes
  }
  const userId = await getUserId(request);

  if (!userId) {
    const session = await getSession(request.headers.get("Cookie"));
    return redirect("/" + lang + "/" + ADMIN_ROUTE_PREFIX + "/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
  return json({
    menu: await getMenuByUserId(userId, t, lang!),
    userInfo: await getUserInfoById(userId),
  });
};

function AdminLayout() {
  useNProgress();
  const { menu, userInfo } = useLoaderData<typeof loader>();
  const value = useContext(SettingContext);
  const [pathname, setPathname] = useState(location.pathname);
  const route = useMemo(() => createProLayoutRoute(menu), [menu]);
  const token = useMemo(() => createTokens(value), [value]);
  const resetStyles = {
    padding: "0px",
    margin: "0px",
  };

  return (
    <ProLayout
      {...value.theme}
      route={route}
      loading={false}
      title={config.title}
      logo={config.logo}
      suppressSiderWhenMenuEmpty={true}
      layout={config.layout as any}
      token={token}
      ErrorBoundary={false}
      pageTitleRender={() => ""}
      menu={config.menu}
      menuFooterRender={MenuFooterRender}
      footerRender={() => <Footer />}
      contentStyle={resetStyles}
      style={resetStyles}
      location={{
        pathname,
      }}
      actionsRender={createActionRenderWrap({ value })}
      avatarProps={{
        src: userInfo?.avatar || config.avatar.src,
        size: config.avatar.size as any,
        title: userInfo?.name,
        render: (_, dom) => {
          return <AvatarDropDown dom={dom} />;
        },
      }}
      menuItemRender={(item, dom) => {
        if (item.isLink) {
          return (
            <a href={item.path} target={"_blank"} rel="noreferrer">
              {dom}
            </a>
          );
        }
        return (
          <Link
            to={`${item.path}`}
            onClick={() => {
              setPathname(item.path || "/welcome");
            }}
          >
            {dom}
          </Link>
        );
      }}
    >
      <Outlet />
      <SettingDrawerWrap theme={value.theme} setTheme={value.setTheme} />
    </ProLayout>
  );
}

export default memo(AdminLayout);
