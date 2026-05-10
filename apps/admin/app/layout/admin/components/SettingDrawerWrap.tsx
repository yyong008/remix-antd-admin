import { SettingOutlined } from "@ant-design/icons";
import { ColorPicker, Drawer, Flex, FloatButton, Space, Switch, Typography } from "antd";
import { useState } from "react";

type ThemeSettings = Record<string, unknown> & {
  colorPrimary?: string;
  navTheme?: string;
};

type SettingDrawerWrapProps = {
  theme: ThemeSettings;
  setTheme: (next: ThemeSettings) => void;
};

const DEFAULT_PRIMARY = "#1677ff";

export function SettingDrawerWrap({ theme, setTheme }: SettingDrawerWrapProps) {
  const [open, setOpen] = useState(false);

  const colorPrimary =
    typeof theme.colorPrimary === "string" && theme.colorPrimary.trim() !== ""
      ? theme.colorPrimary
      : DEFAULT_PRIMARY;

  const navTheme =
    theme.navTheme === "realDark" || theme.navTheme === "light" ? theme.navTheme : "light";
  const darkNav = navTheme === "realDark";

  return (
    <>
      <FloatButton
        type="primary"
        icon={<SettingOutlined />}
        tooltip="Theme"
        onClick={() => setOpen(true)}
        style={{ insetInlineEnd: 24, bottom: 24 }}
      />
      <Drawer
        title="Theme"
        placement="right"
        size={320}
        open={open}
        onClose={() => setOpen(false)}
        getContainer={() => document.body}
      >
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Typography.Text style={{ display: "block", marginBottom: 8 }}>
              Primary color
            </Typography.Text>
            <ColorPicker
              value={colorPrimary}
              showText
              onChangeComplete={(value) => {
                setTheme({ ...theme, colorPrimary: value.toHexString() });
              }}
            />
          </div>
          <Flex justify="space-between" align="center" gap={16} style={{ width: "100%" }}>
            <Typography.Text>Dark navigation</Typography.Text>
            <Switch
              checked={darkNav}
              onChange={(checked) =>
                setTheme({ ...theme, navTheme: checked ? "realDark" : "light" })
              }
            />
          </Flex>
        </Space>
      </Drawer>
    </>
  );
}
