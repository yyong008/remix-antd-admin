import { DownOutlined, RightOutlined } from "@ant-design/icons";

import { Space } from "antd";
import { useAntdThemeToken } from "@/hooks";

export const ExpandIcon = ({ expanded, onExpand, record }: any) => {
  const token = useAntdThemeToken();
  const style = { fontSize: 12, color: token.colorPrimary };
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
