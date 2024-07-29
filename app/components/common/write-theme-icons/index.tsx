import * as icons from "@ant-design/icons";

import { useColorPrimary } from "@/hooks/use-color-primary";

const { EditOutlined } = icons;

export const EditThemeIcon = () => {
  const { colorPrimary } = useColorPrimary();

  return <EditOutlined style={{ color: colorPrimary }} />;
};
