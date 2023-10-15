// components:vendor
import * as _icons from "@ant-design/icons";
import { Space } from "antd";

const { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } =
  _icons;

const ActionIcons = () => {
  return (
    <span style={{ margin: "0 0 0 10" }}>
      <Space>
        <AlipayCircleOutlined key="AlipayCircleOutlined" />
        <TaobaoCircleOutlined key="TaobaoCircleOutlined" />
        <WeiboCircleOutlined key="WeiboCircleOutlined" />
      </Space>
    </span>
  );
};

export default ActionIcons;
