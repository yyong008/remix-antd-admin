import React from "react";
import { Spin } from "antd";

const Loading: React.FC = () => (
  <Spin>
    <div style={{ width: "100vw", height: "100vh" }}></div>
  </Spin>
);

export default Loading;
