// components:vendor
import { theme } from "antd";
import ReactEcharts from "echarts-for-react";

const BarChart = () => {
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
        show: false,
        type: "category",
        data: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
        ],
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        show: false,
        type: "value",
        max: 9,
      },
    ],
    series: [
      {
        type: "bar",
        itemStyle: {
          color: token.colorPrimary,
        },
        data: [2, 4, 6, 3, 5, 7, 1, 8, 2, 4, 6, 3, 5, 7],
      },
    ],
  };

  return <ReactEcharts option={option} style={{ height: "46px" }} />;
};

export default BarChart;
