// types
import type { LoaderFunction } from "@remix-run/node";

// react
import { useContext, useMemo, memo, useState } from "react";

// remix
import { Outlet, useLoaderData, useParams } from "@remix-run/react";

// components
import { ProLayout } from "@ant-design/pro-components";
import { Footer, MenuItemOutLink, MenuItemLink } from "~/components/common";

// layout
// layout
import {
  MenuFooterRender,
  AvatarDropDown,
  SettingDrawerWrap,
  createActionRenderWrap,
  createTokens,
} from "~/layout";

// context
import { SettingContext } from "~/context";

// config
import { prolayoutConfig } from "~/config/prolayout";

// utils
import * as clientUtils from "~/utils";
// hooks
import { useNProgress } from "~/hooks";

// controller
import { LayoutAController } from "~/server/controllers/layout/a";
import { useTranslation } from "react-i18next";

export const loader: LoaderFunction = LayoutAController.loader;

const resetStyles = {
  padding: "0px",
  margin: "0px",
};

function AdminLayout() {
  useNProgress();

  const { lang } = useParams();
  const value = useContext(SettingContext);
  const {
    data: { menu, userInfo },
  } = useLoaderData<typeof loader>();
  const [pathname, setPathname] = useState(location.pathname);
  const token = useMemo(() => createTokens(value), [value]);
  const { t } = useTranslation();
  const route = useMemo(
    () => clientUtils.createProLayoutRoute(lang!, menu, t),
    [lang, menu, t],
  );

  return (
    <ProLayout
      location={{
        pathname,
      }}
      route={route}
      token={token}
      loading={false}
      {...value.theme}
      logo={prolayoutConfig.logo}
      menu={prolayoutConfig.menu}
      style={resetStyles}
      title={prolayoutConfig.title}
      ErrorBoundary={false}
      pageTitleRender={false}
      contentStyle={resetStyles}
      layout={prolayoutConfig.layout as any}
      footerRender={() => <Footer />}
      suppressSiderWhenMenuEmpty={true}
      menuFooterRender={MenuFooterRender}
      actionsRender={createActionRenderWrap({ value })}
      avatarProps={{
        src: userInfo?.avatar || prolayoutConfig.avatar.src,
        size: prolayoutConfig.avatar.size as any,
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
