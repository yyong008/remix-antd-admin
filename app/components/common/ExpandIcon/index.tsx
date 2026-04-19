import { DownOutlined, RightOutlined } from "@ant-design/icons";

import { Space } from "antd";
import { useAntdThemeToken } from "~/hooks/useAntdThemeToken";

export const ExpandIcon = ({ expanded, onExpand, record }: any) => {
  const { colorPrimary } = useAntdThemeToken();
  const style = { fontSize: 12, color: colorPrimary };
  return expanded ? (
    <Space>
      <DownOutlined style={style} onClick={(e) => onExpand(record, e)} />
    </Space>
  ) : (
    <Space>
      <RightOutlined style={style} onClick={(e) => onExpand(record, e)} />
    </Space>
  );
};
