import * as clientUtils from "~/utils/client";
import '@ant-design/v5-patch-for-react-19';
import { Footer, MenuItemLink, MenuItemOutLink } from "@/components/common";
import { Outlet, useParams } from "react-router";
import {
  ProConfigProvider,
  ProLayout,
  WaterMark,
} from "@ant-design/pro-components";
import { memo, useContext, useEffect, useMemo, useState } from "react";

import { App as AntdApp, ConfigProvider } from "antd";
import { AvatarDropDown } from "./components/AvatarDropdown";
import { MenuFooterRender } from "./components/MenuFooterRender";
import { SettingContext } from "@/context/setting-context";
import { SettingDrawerWrap } from "./components/SettingDrawerWrap";
import { createActionRenderWrap } from "./components/createActionsRender";
import { createTokens } from "./components/createToken";
import { getUserInfo } from "~/admin/apis/admin/system/user";
import { info } from "@/config/project";
import { prolayoutConfig } from "@/config/prolayout";
import { useNProgress } from "@/hooks/useNprogress";
import { useT } from "@/hooks/useT";
import { useAntdLocal } from "~/hooks/useAntdLocal";

const resetStyles = {
  padding: "0px",
  margin: "0px",
  height: "100vh",
};

function AdminLayout() {
  useNProgress();
  const locale = useAntdLocal();
  const [isLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const { lang } = useParams();
  const value = useContext(SettingContext);
  const { menu = [], userInfo = {} } = data || ({} as any);
  const [pathname, setPathname] = useState(location.pathname);
  const token = useMemo(() => createTokens(value), [value]);
  const { t } = useT();
  const route = useMemo(
    () => clientUtils.createProLayoutRoute(lang!, menu, t),
    [lang, menu, t],
  );
  const getData = async () => {
    const result: any = await getUserInfo();
    setData(result?.data);
    localStorage.setItem("userInfo", JSON.stringify(result?.data?.userInfo));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ProConfigProvider>
      <ConfigProvider locale={locale}>
        <AntdApp>
          <WaterMark content={info.WaterMark}>
            <ProLayout
              location={{
                pathname,
              }}
              route={route}
              token={token}
              loading={isLoading}
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
                  <MenuItemLink
                    path={item.path!}
                    dom={dom}
                    setPathname={setPathname}
                  />
                );
              }}
            >
              <Outlet />
              <SettingDrawerWrap
                theme={value.theme}
                setTheme={value.setTheme}
              />
            </ProLayout>
          </WaterMark>
        </AntdApp>
      </ConfigProvider>
    </ProConfigProvider>
  );
}

export const Route = memo(AdminLayout);
