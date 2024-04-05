// import type { ActionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs, LoaderFunction } from "@remix-run/node";

// react
import { useContext, useMemo, memo, useState } from "react";

// remix
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";

// components
import { ProLayout } from "@ant-design/pro-components";
import Footer from "~/components/common/Footer";
import MenuFooterRender from "~/layout/MenuFooterRender";
import { AvatarDropDown } from "~/layout/AvatarDropDown";
import { SettingDrawerWrap } from "~/layout/SettingDrawerWrap";
import { createActionRenderWrap } from "~/layout/createActionsRender";
import MenuItemOutLink from "~/components/common/MenuItemOuterLink";
import MenuItemLink from "~/components/common/MenuItemLink";

// context
import SettingContext from "~/context/settingContext";

// config
import { config } from "~/config/index";
import { langs } from "~/config/lang";

import { createTokens } from "~/layout/createToken";

// utils
import { createProLayoutRoute } from "~/utils/prolayout.route.util";
import { createT } from "~/utils/i18n.util";

// hooks
import { useNProgress } from "~/hooks/useNProgress";

// servies
import { auth } from "~/services/common/auth.server";
import { getFlatMenuByUserId } from "~/services/system/menu";
import { getUserInfoById } from "~/services/system/user";

// meta:loader
export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const [userId, redirectFn] = await auth({ request, params } as any);

  if (!userId) {
    return redirectFn();
  }

  const { lang } = params;
  let t = await createT(params);

  if (!langs.includes(typeof lang === "string" ? lang : "")) {
    return redirect("/404"); // 404 is $.tsx routes
  }

  return json({
    menu: await getFlatMenuByUserId(userId, t),
    userInfo: await getUserInfoById(userId),
  });
};

const resetStyles = {
  padding: "0px",
  margin: "0px",
};

function AdminLayout() {
  useNProgress();

  const { lang } = useParams();
  const value = useContext(SettingContext);
  const { menu, userInfo } = useLoaderData<typeof loader>();
  const [pathname, setPathname] = useState(location.pathname);
  const token = useMemo(() => createTokens(value), [value]);
  const route = useMemo(() => createProLayoutRoute(lang!, menu), [lang, menu]);

  return (
    <ProLayout
      location={{
        pathname,
      }}
      route={route}
      token={token}
      loading={false}
      {...value.theme}
      logo={config.logo}
      menu={config.menu}
      style={resetStyles}
      title={config.title}
      ErrorBoundary={false}
      pageTitleRender={false}
      contentStyle={resetStyles}
      layout={config.layout as any}
      footerRender={() => <Footer />}
      suppressSiderWhenMenuEmpty={true}
      menuFooterRender={MenuFooterRender}
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
          return <MenuItemOutLink path={item.path!} dom={dom} />;
        }

        return (
          <MenuItemLink path={item.path!} dom={dom} setPathname={setPathname} />
        );
      }}
    >
      <Outlet />
      <SettingDrawerWrap theme={value.theme} setTheme={value.setTheme} />
    </ProLayout>
  );
}

export default memo(AdminLayout);
