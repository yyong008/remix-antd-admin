import { theme } from "antd";

// components:vendor
import ReactChart from "echarts-for-react";

export default function MainBar({ optionsData }: any) {
  const { token } = theme.useToken();
  const option = {
    animation: true, // 关闭动画
    lazyUpdate: true, // 开启懒更新
    progressive: 500, // 设置增量渲染阈值
    grid: {
      top: "2%",
      left: "0%",
      right: "0%",
      bottom: "0%",
      containLabel: true,
    },
    xAxis: {
      data: optionsData.months,
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        itemStyle: {
          color: token.colorPrimary,
        },
        data: optionsData.data,
      },
    ],
  };
  return (
    <>
      <ReactChart option={option} style={{ height: "380px" }} />
    </>
  );
}
