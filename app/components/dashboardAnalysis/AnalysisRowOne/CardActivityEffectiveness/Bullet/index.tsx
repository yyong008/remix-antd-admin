// components:vendor
import ReactEcharts from "echarts-for-react";
import { theme } from "antd";

const BulletChart = ({ data }: any) => {
  const { token } = theme.useToken();
  const { series } = data;
  const option = {
    grid: {
      left: "0",
      right: "0",
      bottom: "0",
      top: "0",
      containLabel: false,
    },
    xAxis: {
      show: false,
      type: "value",
      boundaryGap: false,
    },
    yAxis: {
      show: false,
      type: "category",
      data: ["Brazil"],
    },
    series: [
      {
        type: "bar",
        data: [series[0].data],
        stack: "sear",
        itemStyle: {
          color: token.colorPrimary,
        },
        barWidth: 10,
      },
      {
        type: "bar",
        data: [[series[1].data]],
        stack: "sear",
        itemStyle: {
          color: "#EEEEEE",
        },
        barWidth: 10,
      },
    ],
  };
  return <ReactEcharts option={option} style={{ height: "46px" }} />;
};

export default BulletChart;
