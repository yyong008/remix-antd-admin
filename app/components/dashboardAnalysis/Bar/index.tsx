import { theme } from "antd";

// components:vendor
import ReactChart from "echarts-for-react";

export default function MainBar() {
  const { token } = theme.useToken();
  const option = {
    grid: {
      top: "2%",
      left: "0%",
      right: "0%",
      bottom: "0%",
      containLabel: true,
    },
    xAxis: {
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        itemStyle: {
          color: token.colorPrimary,
        },
        data: [920, 830, 330, 380, 1100, 400, 490, 1000, 900, 600, 620, 570],
      },
    ],
  };
  return (
    <>
      <ReactChart option={option} style={{ height: "380px" }} />
    </>
  );
}
