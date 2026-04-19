export const createTokens = (value: any) => {
  return {
    header: {
      // colorBgHeader: value.theme.colorPrimary,
    },
    sider: {
      // colorBgMenuItemSelected: "rgba(0, 0, 0, 0.027)",
      colorTextMenuSelected: value.theme.colorPrimary,
    },
  };
};
