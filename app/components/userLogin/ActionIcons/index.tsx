// cores
import React from "react";
import styled from "styled-components";

// components:vendor
import {
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import { theme } from "antd";

const ActionIcons = () => {
  const { token } = theme.useToken();

  const AlipayCircleOutlinedIcon = styled(AlipayCircleOutlined)`
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
  const TaobaoCircleOutlinedIcon = styled(TaobaoCircleOutlined)`
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
  const WeiboCircleOutlinedIcon = styled(WeiboCircleOutlined)`
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

  return (
    <>
      <AlipayCircleOutlinedIcon key="AlipayCircleOutlined" />
      <TaobaoCircleOutlinedIcon key="TaobaoCircleOutlined" />
      <WeiboCircleOutlinedIcon key="WeiboCircleOutlined" />
    </>
  );
};

export default ActionIcons;
