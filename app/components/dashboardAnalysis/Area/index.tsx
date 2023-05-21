// components:vendor
import { theme } from "antd";
import ReactEcharts from "echarts-for-react";

const AreaChart = () => {
  const { token } = theme.useToken();

  const option = {
    grid: {
      top: "0%",
      left: "0%",
      right: "0%",
      bottom: "0%",
      containLabel: false,
    },
    xAxis: [
      {
        boundaryGap: false,
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
    ],
    yAxis: [
      {
        show: false,
        type: "value",
      },
    ],
    series: [
      {
        type: "line",
        smooth: true,
        lineStyle: {
          width: 1,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: token.colorPrimary,
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
    ],
  };
  return <ReactEcharts option={option} style={{ height: "46px" }} />;
};

export default AreaChart;
