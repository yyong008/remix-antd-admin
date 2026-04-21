import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from "@ant-design/icons";

import { Flex, Space } from "antd";

const iconStyle = { color: "rgba(0,0,0,0.25)" };

const ActionIcons = () => {
  return (
    <Flex style={{ display: "inline-flex", flexWrap: "nowrap", paddingLeft: 10 }}>
      <Space>
        <AlipayCircleOutlined style={iconStyle} />
        <TaobaoCircleOutlined style={iconStyle} />
        <WeiboCircleOutlined style={iconStyle} />
      </Space>
    </Flex>
  );
};

export default ActionIcons;
