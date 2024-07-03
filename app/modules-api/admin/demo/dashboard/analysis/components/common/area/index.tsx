// components:vendor
import { theme } from "antd";
import ReactEcharts from "echarts-for-react";

const AreaChart = (props: any) => {
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
        data: props?.xAxis?.data,
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
        data: props?.series?.data,
      },
    ],
  };
  return <ReactEcharts option={option} style={{ height: "46px" }} />;
};

export default AreaChart;
