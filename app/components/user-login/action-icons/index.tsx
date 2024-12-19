import {
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";

import { Space } from "antd";

const ActionIcons = () => {
  return (
    <div className="inline-flex flex-nowrap pl-[10px]">
      <Space>
        <AlipayCircleOutlined
          key="AlipayCircleOutlined"
          className="text-gray-300"
        />
        <TaobaoCircleOutlined
          key="TaobaoCircleOutlined"
          className="text-gray-300"
        />
        <WeiboCircleOutlined
          key="WeiboCircleOutlined"
          className="text-gray-300"
        />
      </Space>
    </div>
  );
};

export default ActionIcons;
