// cores
import styled from "styled-components";

//
import { theme } from "antd";
import {
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";

const ActionIcons = () => {
  const { token } = theme.useToken();
  const s = `
      margin-left: 8px;
      color: #b1b1b1;
      font-size: 24px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: ${token.colorPrimary};
      }
    `;
  const AlipayCircleOutlinedIcon = styled(AlipayCircleOutlined)`
    ${s}
  `;
  const TaobaoCircleOutlinedIcon = styled(TaobaoCircleOutlined)`
    ${s}
  `;
  const WeiboCircleOutlinedIcon = styled(WeiboCircleOutlined)`
    ${s}
  `;

  return (
    <>
      <AlipayCircleOutlinedIcon key="AlipayCircleOutlined" />
      <TaobaoCircleOutlinedIcon key="TaobaoCircleOutlined" />
      <WeiboCircleOutlinedIcon key="WeiboCircleOutlined" />
    </>
  );
};

export default ActionIcons;
